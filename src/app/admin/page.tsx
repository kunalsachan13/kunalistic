'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  KeyRound,
  LayoutDashboard,
  Boxes,
  Inbox,
  Database,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  LogOut,
  X,
  Eye,
  Heart,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Terminal,
  ShieldCheck,
  Upload,
  UploadCloud,
  ImageIcon,
  DollarSign,
  RotateCcw,
  Save,
  Check,
  FileText,
} from 'lucide-react';
import { AppItem, AppRequest, DashboardStats, BudgetPreset, DEFAULT_BUDGET_PRESETS, DEFAULT_SERVICE_TYPES } from '@/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Data State
  const [activeTab, setActiveTab] = useState<'overview' | 'apps' | 'requests' | 'budgets' | 'db'>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [requests, setRequests] = useState<AppRequest[]>([]);
  const [budgetPresets, setBudgetPresets] = useState<BudgetPreset[]>(DEFAULT_BUDGET_PRESETS);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Budget Presets Management State
  const [isSavingBudgets, setIsSavingBudgets] = useState(false);
  const [budgetStatusMsg, setBudgetStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // App Modal State
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [appFormData, setAppFormData] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    category: 'Web App',
    tags: '',
    thumbnail_url: '',
    live_url: '',
    github_url: '',
    features: '',
    tech_stack: '',
    featured: false,
    status: 'live' as AppItem['status'],
  });

  // Draft Management State
  const DRAFT_STORAGE_KEY = 'kunalistic_admin_app_draft';
  const [savedDraft, setSavedDraft] = useState<{
    formData: typeof appFormData;
    editingId: string | null;
    savedAt: string;
  } | null>(null);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [draftToast, setDraftToast] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  // Request Viewer Modal State
  const [selectedRequest, setSelectedRequest] = useState<AppRequest | null>(null);
  const [reqStatusUpdate, setReqStatusUpdate] = useState('');
  const [reqPriorityUpdate, setReqPriorityUpdate] = useState('');
  const [reqAdminNotes, setReqAdminNotes] = useState('');
  const [isUpdatingReq, setIsUpdatingReq] = useState(false);

  // Requests Filter
  const [requestFilter, setRequestFilter] = useState('all');

  // Check initial authentication
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
      if (data.authenticated) {
        loadAdminData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      const [statsRes, appsRes, reqsRes, budgetRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/apps'),
        fetch('/api/requests'),
        fetch('/api/budget-presets'),
      ]);

      const [statsData, appsData, reqsData, budgetData] = await Promise.all([
        statsRes.json(),
        appsRes.json(),
        reqsRes.json(),
        budgetRes.json(),
      ]);

      if (statsData.success) setStats(statsData.data);
      if (appsData.success) setApps(appsData.data);
      if (reqsData.success) setRequests(reqsData.data);
      if (budgetData.success && Array.isArray(budgetData.data)) setBudgetPresets(budgetData.data);
    } catch (e) {
      console.error('Error loading admin data', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Invalid passcode');
      } else {
        setIsAuthenticated(true);
        loadAdminData();
      }
    } catch {
      setAuthError('Connection failed. Please retry.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Draft Tracking & Auto-Save
  const isFormDirty = useCallback(() => {
    if (editingApp) {
      const origTags = editingApp.tags?.join(', ') || '';
      const origFeatures = editingApp.features?.join('\n') || '';
      const origTech = editingApp.tech_stack?.join(', ') || '';
      return (
        appFormData.title !== editingApp.title ||
        appFormData.slug !== editingApp.slug ||
        appFormData.tagline !== (editingApp.tagline || '') ||
        appFormData.description !== editingApp.description ||
        appFormData.category !== editingApp.category ||
        appFormData.tags !== origTags ||
        appFormData.thumbnail_url !== (editingApp.thumbnail_url || '') ||
        appFormData.live_url !== (editingApp.live_url || '') ||
        appFormData.github_url !== (editingApp.github_url || '') ||
        appFormData.features !== origFeatures ||
        appFormData.tech_stack !== origTech ||
        appFormData.featured !== editingApp.featured ||
        appFormData.status !== editingApp.status
      );
    } else {
      return Boolean(
        appFormData.title.trim() ||
        appFormData.slug.trim() ||
        appFormData.tagline.trim() ||
        appFormData.description.trim() ||
        appFormData.thumbnail_url.trim() ||
        appFormData.live_url.trim() ||
        appFormData.github_url.trim() ||
        appFormData.tags.trim() ||
        appFormData.features.trim()
      );
    }
  }, [appFormData, editingApp]);

  const saveDraftToStorage = useCallback((customData?: typeof appFormData) => {
    const dataToSave = customData || appFormData;
    if (!editingApp && !dataToSave.title.trim() && !dataToSave.description.trim() && !dataToSave.thumbnail_url) {
      return;
    }
    const draftObj = {
      formData: dataToSave,
      editingId: editingApp ? editingApp.id : null,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftObj));
      setSavedDraft(draftObj);
    } catch (err) {
      console.error('Failed to save draft to localStorage', err);
    }
  }, [appFormData, editingApp]);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.formData) {
          setSavedDraft(parsed);
        }
      }
    } catch {
      // Ignore storage parse errors
    }
  }, []);

  // Debounced auto-save draft while modal is open and dirty
  useEffect(() => {
    if (!isAppModalOpen || !isFormDirty()) return;
    const timer = setTimeout(() => {
      saveDraftToStorage();
    }, 1200);
    return () => clearTimeout(timer);
  }, [isAppModalOpen, appFormData, isFormDirty, saveDraftToStorage]);

  // Save draft and notify if user closes tab or refreshes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isAppModalOpen && isFormDirty()) {
        saveDraftToStorage();
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAppModalOpen, isFormDirty, saveDraftToStorage]);

  // Handle ESC key for prompt
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAppModalOpen) {
        if (showExitPrompt) {
          setShowExitPrompt(false);
        } else {
          handleRequestCloseAppModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAppModalOpen, showExitPrompt, isFormDirty]);

  const handleRequestCloseAppModal = () => {
    if (isFormDirty()) {
      setShowExitPrompt(true);
    } else {
      forceCloseAppModal();
    }
  };

  const forceCloseAppModal = () => {
    setIsAppModalOpen(false);
    setShowExitPrompt(false);
    setEditingApp(null);
    setUploadError('');
  };

  const handlePromptSaveDraft = () => {
    saveDraftToStorage();
    setShowExitPrompt(false);
    setIsAppModalOpen(false);
    setEditingApp(null);
    setDraftToast({ type: 'success', text: 'Project draft saved. You can resume anytime.' });
    setTimeout(() => setDraftToast(null), 4000);
  };

  const handlePromptDiscard = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setSavedDraft(null);
    setShowExitPrompt(false);
    setIsAppModalOpen(false);
    setEditingApp(null);
    setDraftToast({ type: 'info', text: 'Changes discarded.' });
    setTimeout(() => setDraftToast(null), 3000);
  };

  const handlePromptKeepEditing = () => {
    setShowExitPrompt(false);
  };

  const handleManualSaveDraft = () => {
    saveDraftToStorage();
    setDraftToast({ type: 'success', text: 'Draft saved to local storage.' });
    setTimeout(() => setDraftToast(null), 3000);
  };

  const handleRestoreDraft = () => {
    if (!savedDraft) return;
    setAppFormData(savedDraft.formData);
    if (savedDraft.editingId) {
      const found = apps.find((a) => a.id === savedDraft.editingId);
      setEditingApp(found || null);
    } else {
      setEditingApp(null);
    }
    setIsAppModalOpen(true);
    setDraftToast({ type: 'success', text: 'Draft restored into form.' });
    setTimeout(() => setDraftToast(null), 3000);
  };

  const handleDiscardDraft = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setSavedDraft(null);
    setDraftToast({ type: 'info', text: 'Draft discarded.' });
    setTimeout(() => setDraftToast(null), 3000);
  };

  // App Creation / Updating
  const handleOpenAppModal = (appToEdit?: AppItem) => {
    setUploadError('');
    if (appToEdit) {
      setEditingApp(appToEdit);
      setAppFormData({
        title: appToEdit.title,
        slug: appToEdit.slug,
        tagline: appToEdit.tagline,
        description: appToEdit.description,
        category: appToEdit.category,
        tags: appToEdit.tags?.join(', ') || '',
        thumbnail_url: appToEdit.thumbnail_url || '',
        live_url: appToEdit.live_url || '',
        github_url: appToEdit.github_url || '',
        features: appToEdit.features?.join('\n') || '',
        tech_stack: appToEdit.tech_stack?.join(', ') || '',
        featured: appToEdit.featured,
        status: appToEdit.status,
      });
    } else {
      setEditingApp(null);
      setAppFormData({
        title: '',
        slug: '',
        tagline: '',
        description: '',
        category: DEFAULT_SERVICE_TYPES[0].label,
        tags: '',
        thumbnail_url: '',
        live_url: '',
        github_url: '',
        features: '',
        tech_stack: 'Next.js, TypeScript, Tailwind CSS',
        featured: false,
        status: 'live',
      });
    }
    setIsAppModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploadingThumb(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Failed to upload thumbnail image');
      } else {
        setAppFormData((prev) => ({ ...prev, thumbnail_url: data.url }));
      }
    } catch {
      setUploadError('Failed to upload thumbnail image. Please try again.');
    } finally {
      setIsUploadingThumb(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSaveApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!appFormData.title.trim()) {
      setDraftToast({ type: 'info', text: 'App Title is required to save.' });
      setTimeout(() => setDraftToast(null), 3000);
      return;
    }

    const normalizeUrl = (url: string) => {
      const trimmed = url.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }
      return `https://${trimmed}`;
    };

    const payload = {
      title: appFormData.title.trim(),
      slug: appFormData.slug.trim() || appFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: appFormData.tagline.trim(),
      description: appFormData.description.trim(),
      category: appFormData.category || DEFAULT_SERVICE_TYPES[0].label,
      tags: appFormData.tags.split(',').map((s) => s.trim()).filter(Boolean),
      thumbnail_url: appFormData.thumbnail_url.trim(),
      live_url: normalizeUrl(appFormData.live_url),
      github_url: normalizeUrl(appFormData.github_url),
      features: appFormData.features.split('\n').map((s) => s.trim()).filter(Boolean),
      tech_stack: appFormData.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      featured: appFormData.featured,
      status: appFormData.status,
    };

    try {
      if (editingApp) {
        await fetch(`/api/apps/${editingApp.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/apps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setSavedDraft(null);
      setIsAppModalOpen(false);
      setShowExitPrompt(false);
      setEditingApp(null);
      setDraftToast({
        type: 'success',
        text: editingApp ? 'App changes published.' : 'App published to showcase.',
      });
      setTimeout(() => setDraftToast(null), 3500);
      loadAdminData();
    } catch (err) {
      console.error('Error saving app', err);
    }
  };

  const handleDeleteApp = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await fetch(`/api/apps/${id}`, { method: 'DELETE' });
      loadAdminData();
    } catch (err) {
      console.error('Error deleting app', err);
    }
  };

  // Budget Presets Actions
  const handleAddBudgetPreset = () => {
    const newPreset: BudgetPreset = {
      id: `tier_${Date.now()}`,
      label: '$2,500 - $7,500',
      tag: 'CUSTOM',
      desc: 'Bespoke custom architecture and tailored development scope',
    };
    setBudgetPresets([...budgetPresets, newPreset]);
  };

  const handleUpdateBudgetPreset = (id: string, field: keyof BudgetPreset, val: string) => {
    setBudgetPresets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleDeleteBudgetPreset = (id: string) => {
    if (budgetPresets.length <= 1) {
      alert('At least one budget tier must be maintained for clients.');
      return;
    }
    setBudgetPresets((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetBudgetPresets = () => {
    if (!confirm('Reset all budget tiers back to the default studio presets?')) return;
    setBudgetPresets(DEFAULT_BUDGET_PRESETS);
  };

  const handleSaveBudgetPresets = async () => {
    setIsSavingBudgets(true);
    setBudgetStatusMsg(null);
    try {
      const res = await fetch('/api/budget-presets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presets: budgetPresets }),
      });
      const data = await res.json();
      if (data.success) {
        setBudgetStatusMsg({ type: 'success', text: 'Budget presets saved successfully! Live on client commission form.' });
        setTimeout(() => setBudgetStatusMsg(null), 4000);
      } else {
        setBudgetStatusMsg({ type: 'error', text: data.error || 'Failed to save budget presets.' });
      }
    } catch {
      setBudgetStatusMsg({ type: 'error', text: 'Network error saving budget presets.' });
    } finally {
      setIsSavingBudgets(false);
    }
  };

  // Request Management
  const handleOpenRequest = (req: AppRequest) => {
    setSelectedRequest(req);
    setReqStatusUpdate(req.status);
    setReqPriorityUpdate(req.priority);
    setReqAdminNotes(req.admin_notes || '');
  };

  const handleSaveRequestUpdate = async () => {
    if (!selectedRequest) return;
    setIsUpdatingReq(true);
    try {
      await fetch(`/api/requests/${selectedRequest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reqStatusUpdate,
          priority: reqPriorityUpdate,
          admin_notes: reqAdminNotes,
        }),
      });
      setSelectedRequest(null);
      loadAdminData();
    } catch (err) {
      console.error('Error updating request', err);
    } finally {
      setIsUpdatingReq(false);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom request?')) return;
    try {
      await fetch(`/api/requests/${id}`, { method: 'DELETE' });
      setSelectedRequest(null);
      loadAdminData();
    } catch (err) {
      console.error('Error deleting request', err);
    }
  };

  // 1. Loading State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/icon.png" alt="Kunalistic" width={22} height={22} className="opacity-70" />
            </div>
          </div>
          <span className="text-xs text-neutral-400 font-mono tracking-widest uppercase">
            Verifying Session Access...
          </span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08080a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Inter',sans-serif]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none -top-24 left-1/2 -translate-x-1/2" />

        <div className="w-full max-w-md bg-[#0e0e12] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 text-center">
          
          <div className="relative mx-auto mb-6 w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-inner group">
            <Image
              src="/icon.png"
              alt="Kunalistic Logo"
              width={52}
              height={52}
              className="drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-white text-black font-['Space_Grotesk',monospace] text-[9px] font-bold tracking-wider uppercase border border-white/20">
              SECURE
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-['Space_Grotesk',monospace] text-neutral-400 uppercase tracking-widest mb-3">
            <Lock className="w-3 h-3 text-white" />
            <span>KUNALISTIC VAULT</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Syne',sans-serif] tracking-tight">
            Admin Console
          </h1>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
            Direct console access restricted to authorized administrators. Enter the secret key to authenticate.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2 text-left"
              >
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span className="font-mono">{authError}</span>
              </motion.div>
            )}

            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                placeholder="Enter Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#141418] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-['Space_Grotesk',monospace] tracking-wider transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl font-bold text-black text-xs uppercase tracking-wider bg-white hover:bg-neutral-200 shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate Access</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              ← Return to Showcase
            </Link>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Neon DB Linked</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  const filteredRequests = requests.filter((r) => {
    if (requestFilter === 'all') return true;
    return r.status === requestFilter;
  });

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col font-['Inter',sans-serif] selection:bg-white selection:text-black">
      
      {/* Top Admin Bar */}
      <header className="border-b border-white/10 bg-[#08080a]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 group-hover:border-white/30 transition-colors">
              <Image src="/icon.png" alt="Kunalistic" width={24} height={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base font-['Syne',sans-serif] tracking-tight">
                  KuNaListic
                </span>
                <span className="text-[10px] font-['Space_Grotesk',monospace] px-2 py-0.5 rounded-full bg-white text-black font-bold uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono hidden sm:block">Control Center</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAdminData}
            disabled={isLoadingData}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="Reload Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin text-white' : ''}`} />
          </button>
          
          <Link
            href="/"
            className="text-xs text-neutral-400 hover:text-white font-mono px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors hidden sm:flex items-center gap-1.5"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Admin Body Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('apps')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'apps'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Manage Apps ({apps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'requests'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Client Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('budgets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'budgets'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Budget Presets ({budgetPresets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('db')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'db'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Neon DB Telemetry</span>
          </button>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0e0e12] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase tracking-wider">
                  <span>Total Apps</span>
                  <Boxes className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2 font-['Space_Grotesk',monospace]">
                  {stats?.totalApps ?? apps.length}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                  {stats?.featuredApps ?? 0} marked as Featured
                </div>
              </div>

              <div className="bg-[#0e0e12] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase tracking-wider">
                  <span>Client Briefs</span>
                  <Inbox className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2 font-['Space_Grotesk',monospace]">
                  {stats?.totalRequests ?? requests.length}
                </div>
                <div className="text-[11px] text-amber-300 mt-1 font-mono">
                  {stats?.pendingRequests ?? 0} Pending Review
                </div>
              </div>

              <div className="bg-[#0e0e12] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase tracking-wider">
                  <span>Cumulative Views</span>
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2 font-['Space_Grotesk',monospace]">
                  {(stats?.totalViews ?? 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                  Across all live projects
                </div>
              </div>

              <div className="bg-[#0e0e12] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase tracking-wider">
                  <span>Likes / Upvotes</span>
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-2 font-['Space_Grotesk',monospace]">
                  {(stats?.totalLikes ?? 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                  Community endorsements
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Quick Actions */}
              <div className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white font-['Syne',sans-serif] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {savedDraft ? (
                    <button
                      onClick={handleRestoreDraft}
                      className="p-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/20 text-left transition-all group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-xs font-bold text-white font-['Syne',sans-serif]">Resume Draft</div>
                      <div className="text-[11px] text-neutral-400 truncate">{savedDraft.formData.title || 'Untitled Project'}</div>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenAppModal()}
                      className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-left transition-all group"
                    >
                      <Plus className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-bold text-white font-['Syne',sans-serif]">Add Web App</div>
                      <div className="text-[11px] text-neutral-400">Publish showcase entry</div>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('requests')}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-left transition-all group"
                  >
                    <Inbox className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white font-['Syne',sans-serif]">Inbound Briefs</div>
                    <div className="text-[11px] text-neutral-400">Check client leads</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('budgets')}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-left transition-all group"
                  >
                    <DollarSign className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white font-['Syne',sans-serif]">Budget Presets</div>
                    <div className="text-[11px] text-neutral-400">Configure client tiers</div>
                  </button>
                </div>
              </div>

              {/* Inbound Requests Spotlight */}
              <div className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-['Syne',sans-serif] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white" />
                    Latest Inbound Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs text-neutral-300 hover:text-white font-mono flex items-center gap-1 transition-colors"
                  >
                    View All ({requests.length}) <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {requests.slice(0, 3).map((req) => (
                    <div
                      key={req.id}
                      onClick={() => handleOpenRequest(req)}
                      className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/20 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <div className="text-xs font-bold text-white font-['Syne',sans-serif]">{req.project_title}</div>
                        <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                          {req.client_name} • {req.budget_range}
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-['Space_Grotesk',monospace] uppercase font-semibold border ${
                        req.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : req.status === 'in_progress'
                          ? 'bg-white text-black border-white'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                  {requests.length === 0 && (
                    <p className="text-xs text-neutral-500 py-6 text-center font-mono">No client requests recorded yet.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: APPS MANAGEMENT */}
        {activeTab === 'apps' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">Application Catalog</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Create, edit, feature, and manage all showcase portfolio applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
                {savedDraft && (
                  <button
                    onClick={handleRestoreDraft}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white text-xs font-mono transition-all group shadow-sm"
                  >
                    <Clock className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                    <span>Resume Draft: {savedDraft.formData.title || 'Untitled'}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </button>
                )}
                <button
                  onClick={() => handleOpenAppModal()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Web App</span>
                </button>
              </div>
            </div>

            {/* Apps Table */}
            <div className="bg-[#0e0e12] rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.02] border-b border-white/10 text-neutral-400 uppercase font-['Space_Grotesk',monospace] text-[10px] tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">App Details</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Featured</th>
                      <th className="px-5 py-3.5">Telemetry</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {apps.map((app) => (
                      <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              onClick={() => handleOpenAppModal(app)}
                              className="relative cursor-pointer group/thumb shrink-0"
                              title="Click to upload or change thumbnail"
                            >
                              {app.thumbnail_url ? (
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                                  <img
                                    src={app.thumbnail_url}
                                    alt={app.title}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover/thumb:grayscale-0 transition-all"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                    <Upload className="w-3.5 h-3.5 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-dashed border-white/20 hover:border-white/50 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                                  <Upload className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm font-['Syne',sans-serif]">{app.title}</div>
                              <div className="text-[11px] text-neutral-400 max-w-xs truncate">
                                {app.tagline}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] bg-white/[0.04] border border-white/10 text-neutral-300 font-mono">
                            {app.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold border ${
                            app.status === 'live'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {app.featured ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] bg-white text-black font-semibold font-mono tracking-wider">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-[11px] font-mono">Standard</span>
                          )}
                        </td>
                        <td className="px-5 py-4 font-['Space_Grotesk',monospace] text-[11px] text-neutral-400">
                          <div>{app.views_count} views</div>
                          <div>{app.likes_count} likes</div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {app.live_url && (
                              <a
                                href={app.live_url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10 transition-colors"
                                title="Open Live Site"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => handleOpenAppModal(app)}
                              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-colors"
                              title="Edit Application"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteApp(app.id, app.title)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {apps.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-neutral-500 font-mono">
                          No applications currently registered in the database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CLIENT CUSTOM REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">Client Custom Inquiries</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Direct client briefs, commissions, budget estimates, and private admin notes.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['all', 'pending', 'reviewing', 'in_progress', 'completed', 'declined'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setRequestFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-colors ${
                      requestFilter === st
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:bg-white/[0.05] border border-white/5'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  onClick={() => handleOpenRequest(req)}
                  className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10 hover:border-white/30 cursor-pointer flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold border ${
                        req.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : req.status === 'in_progress'
                          ? 'bg-white text-black border-white'
                          : req.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          : 'bg-white/[0.04] text-neutral-400 border-white/10'
                      }`}>
                        {req.status}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold border ${
                        req.priority === 'urgent'
                          ? 'bg-red-500/10 text-red-300 border-red-500/20'
                          : req.priority === 'high'
                          ? 'bg-orange-500/10 text-orange-300 border-orange-500/20'
                          : 'bg-white/[0.03] text-neutral-400 border-white/5'
                      }`}>
                        {req.priority}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-3.5 font-['Syne',sans-serif] group-hover:text-white transition-colors">
                      {req.project_title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
                      <span>Client: <span className="text-white font-semibold">{req.client_name}</span>{req.client_company && ` (${req.client_company})`}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/90 text-[10px] font-mono border border-white/10">
                        {req.project_type || 'Web Design'}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 mt-2.5 line-clamp-3 leading-relaxed">
                      {req.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-['Space_Grotesk',monospace]">
                    <span className="text-white font-bold">{req.budget_range}</span>
                    <span>{req.timeline || 'Flexible'}</span>
                  </div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="col-span-full bg-[#0e0e12] p-12 text-center rounded-2xl border border-white/10">
                  <Inbox className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400 font-mono">No requests found matching &apos;{requestFilter}&apos;</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: BUDGET PRESETS CONTROL */}
        {activeTab === 'budgets' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">Budget Presets & Pricing Tiers</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Configure the project investment options displayed to prospective clients on the commission form.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleResetBudgetPresets}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddBudgetPreset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/20 text-xs font-semibold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Tier</span>
                </button>

                <button
                  type="button"
                  disabled={isSavingBudgets}
                  onClick={handleSaveBudgetPresets}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50"
                >
                  {isSavingBudgets ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Presets</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {budgetStatusMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
                  budgetStatusMsg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                }`}
              >
                {budgetStatusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                )}
                <span>{budgetStatusMsg.text}</span>
              </motion.div>
            )}

            {/* Live Client Preview Box */}
            <div className="bg-[#0e0e12] rounded-2xl border border-white/10 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Client Commission Form Preview
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {budgetPresets.length} Tiers Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {budgetPresets.map((tier, idx) => (
                  <div
                    key={tier.id}
                    className="p-3.5 rounded-xl border border-white/10 bg-[#141418] relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-white">
                        {tier.label || 'Untitled Tier'}
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/10 text-neutral-300 border border-white/15">
                        {tier.tag || 'TAG'}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                      {tier.desc || 'No description provided'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Presets Editor Grid */}
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
                Configure Pricing Tiers & Descriptions
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetPresets.map((preset, index) => (
                  <div
                    key={preset.id}
                    className="bg-[#0e0e12] p-5 rounded-2xl border border-white/10 space-y-3 relative group hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-[10px] font-mono text-white font-bold">
                          {index + 1}
                        </span>
                        <span className="text-xs font-mono font-semibold text-neutral-300">
                          Tier #{index + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-white text-black">
                          {preset.tag || 'TAG'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBudgetPreset(preset.id)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Tier"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          Budget Range Label *
                        </label>
                        <input
                          type="text"
                          required
                          value={preset.label}
                          placeholder="e.g. $1,500 - $5,000"
                          onChange={(e) => handleUpdateBudgetPreset(preset.id, 'label', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#141418] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={preset.tag}
                          placeholder="POPULAR"
                          onChange={(e) => handleUpdateBudgetPreset(preset.id, 'tag', e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 rounded-xl bg-[#141418] border border-white/10 text-white font-mono text-xs uppercase focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        Client Scope Explanation
                      </label>
                      <input
                        type="text"
                        value={preset.desc}
                        placeholder="Explain what is included in this tier..."
                        onChange={(e) => handleUpdateBudgetPreset(preset.id, 'desc', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#141418] border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: NEON TELEMETRY */}
        {activeTab === 'db' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">Neon PostgreSQL Telemetry</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Real-time serverless PostgreSQL cluster status, connection pool, and table manifests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Project ID</div>
                <div className="text-lg font-bold text-white mt-1 font-['Syne',sans-serif]">kunalistic</div>
                <div className="text-xs text-emerald-400 mt-3 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Cluster Online & Operational
                </div>
              </div>

              <div className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Region & Host</div>
                <div className="text-lg font-bold text-white mt-1 font-['Space_Grotesk',monospace]">aws-us-east-1</div>
                <div className="text-xs text-neutral-400 mt-3 font-mono">Driver: @neondatabase/serverless</div>
              </div>

              <div className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Engine Specification</div>
                <div className="text-lg font-bold text-white mt-1 font-['Space_Grotesk',monospace]">PostgreSQL v18.6</div>
                <div className="text-xs text-neutral-400 mt-3 font-mono">SSL Connection: Required</div>
              </div>
            </div>

            <div className="bg-[#0e0e12] p-6 rounded-2xl border border-white/10 font-['Space_Grotesk',monospace] text-xs text-neutral-300 space-y-3">
              <div className="text-neutral-400 uppercase text-[10px] tracking-wider font-bold">Database Tables Manifest</div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div>• <span className="text-white font-bold">apps</span> - Showcase catalog, metadata, tech stack, views, likes</div>
                <div>• <span className="text-white font-bold">app_requests</span> - Inbound client briefs, budget, priority, admin notes</div>
                <div>• <span className="text-white font-bold">app_likes</span> - IP-deduplicated upvotes telemetry table</div>
                <div>• <span className="text-white font-bold">admin_config</span> - Dynamic platform configurations & budget presets</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD / EDIT APP (PERFECTED SCROLL & FIXED TITLE BAR) */}
      <AnimatePresence>
        {isAppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <div
              onClick={handleRequestCloseAppModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="relative w-full max-w-2xl max-h-[92vh] bg-[#0e0e12] rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 flex flex-col overflow-hidden"
            >
              {/* Permanent Fixed Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 shrink-0 bg-[#0e0e12]">
                <div>
                  <span className="text-[10px] font-['Space_Grotesk',monospace] uppercase text-neutral-400 tracking-wider">
                    {editingApp ? 'EDIT RECORD' : 'NEW REGISTRATION'}
                  </span>
                  <h3 className="text-lg font-bold text-white font-['Syne',sans-serif]">
                    {editingApp ? `Edit: ${editingApp.title}` : 'Add New Web App to Showcase'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleRequestCloseAppModal}
                  className="p-1.5 rounded-xl bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body with Visible Title Field at Top */}
              <form onSubmit={handleSaveApp} id="app-form" noValidate className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-4 text-xs font-['Inter',sans-serif]">
                
                {/* Unfinished Draft Available Banner */}
                {savedDraft && !editingApp && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center text-white shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">
                          Unsaved Draft Found: <span className="font-mono text-neutral-300">{savedDraft.formData.title || 'Untitled Project'}</span>
                        </p>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          Saved {new Date(savedDraft.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={handleRestoreDraft}
                        className="px-3 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
                      >
                        Restore Draft
                      </button>
                      <button
                        type="button"
                        onClick={handleDiscardDraft}
                        className="px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-white/5 transition-colors text-xs font-mono"
                        title="Discard Draft"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                )}

                {/* 1. App Title (High Visibility Top Field - Mandatory) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-200 font-semibold mb-1.5">
                      App Title <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Synthetix AI Dashboard"
                      value={appFormData.title}
                      onChange={(e) => setAppFormData({ ...appFormData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5">
                      Slug (URL identifier)
                    </label>
                    <input
                      type="text"
                      placeholder="auto-generated-if-empty"
                      value={appFormData.slug}
                      onChange={(e) => setAppFormData({ ...appFormData, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                {/* 2. Tagline (Optional) */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1.5">
                    Tagline / One-Liner Summary <span className="text-neutral-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Short punchy summary displayed on showcase cards"
                    value={appFormData.tagline}
                    onChange={(e) => setAppFormData({ ...appFormData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                {/* 3. Detailed Description (Optional) */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1.5">
                    Detailed Description <span className="text-neutral-500 text-[10px]">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Comprehensive explanation of what the app does, architecture, and user workflow..."
                    value={appFormData.description}
                    onChange={(e) => setAppFormData({ ...appFormData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-white/40 leading-relaxed"
                  />
                </div>

                {/* 4. Category, Status, Featured */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5">Category</label>
                    <input
                      type="text"
                      list="category-suggestions"
                      placeholder="e.g. 3D Animation, Web Design..."
                      value={appFormData.category}
                      onChange={(e) => setAppFormData({ ...appFormData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-white/40"
                    />
                    <datalist id="category-suggestions">
                      {DEFAULT_SERVICE_TYPES.map((s) => (
                        <option key={s.label} value={s.label} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5">Status</label>
                    <select
                      value={appFormData.status}
                      onChange={(e) => setAppFormData({ ...appFormData, status: e.target.value as AppItem['status'] })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-white/40 font-mono"
                    >
                      <option value="live">Live</option>
                      <option value="beta">Beta</option>
                      <option value="concept">Concept</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5">Featured</label>
                    <label className="flex items-center gap-2 mt-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appFormData.featured}
                        onChange={(e) => setAppFormData({ ...appFormData, featured: e.target.checked })}
                        className="rounded bg-[#141418] border-white/10 text-white accent-white"
                      />
                      <span className="text-white font-mono text-[11px]">Pin as Featured</span>
                    </label>
                  </div>
                </div>

                {/* 5. Live & Repo URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5">Live URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={appFormData.live_url}
                      onChange={(e) => setAppFormData({ ...appFormData, live_url: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5">GitHub Repo URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={appFormData.github_url}
                      onChange={(e) => setAppFormData({ ...appFormData, github_url: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                {/* 6. Thumbnail Image Uploader */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-neutral-300 font-semibold">
                      App Thumbnail Image
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Supports PNG, JPG, WebP, SVG, AVIF (Max 10MB)
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {uploadError && (
                    <div className="mb-2.5 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {appFormData.thumbnail_url ? (
                    <div className="p-3 rounded-2xl bg-[#141418] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0 flex items-center justify-center">
                        <img
                          src={appFormData.thumbnail_url}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-white uppercase border border-white/20">
                          Active
                        </div>
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <div className="text-[11px] font-mono text-neutral-300 break-all bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 truncate max-w-full">
                          {appFormData.thumbnail_url}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={isUploadingThumb}
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace Thumbnail</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setAppFormData({ ...appFormData, thumbnail_url: '' })}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 font-semibold text-xs border border-red-500/20 transition-colors flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => !isUploadingThumb && fileInputRef.current?.click()}
                      className={`border-2 border-dashed border-white/15 hover:border-white/40 rounded-2xl p-6 text-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all group ${
                        isUploadingThumb ? 'pointer-events-none opacity-60' : ''
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-3 text-neutral-300 group-hover:scale-105 group-hover:text-white transition-all">
                        {isUploadingThumb ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <UploadCloud className="w-6 h-6 text-neutral-300 group-hover:text-white" />
                        )}
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {isUploadingThumb ? 'Uploading image...' : 'Click to Upload App Thumbnail'}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                        Files are saved directly to project uploads directory
                      </p>
                    </div>
                  )}

                  <div className="mt-2.5">
                    <span className="text-[10px] text-neutral-500 font-mono">Or paste hosted image URL or uploaded file path:</span>
                    <input
                      type="text"
                      placeholder="e.g. /uploads/... or https://..."
                      value={appFormData.thumbnail_url}
                      onChange={(e) => setAppFormData({ ...appFormData, thumbnail_url: e.target.value })}
                      className="mt-1 w-full px-3.5 py-2 rounded-xl bg-[#141418] border border-white/10 text-white font-mono text-[11px] placeholder-neutral-500 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                {/* 7. Tech Stack */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1.5">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Next.js, TypeScript, Tailwind, Neon Postgres"
                    value={appFormData.tech_stack}
                    onChange={(e) => setAppFormData({ ...appFormData, tech_stack: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono focus:outline-none focus:border-white/40"
                  />
                </div>

                {/* 8. Key Features */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1.5">Key Features (one per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    value={appFormData.features}
                    onChange={(e) => setAppFormData({ ...appFormData, features: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono focus:outline-none focus:border-white/40"
                  />
                </div>
              </form>

              {/* Permanent Fixed Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-white/10 shrink-0 bg-[#0e0e12] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleManualSaveDraft}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors border border-white/5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save as Draft</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleRequestCloseAppModal}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="app-form"
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all"
                  >
                    {editingApp ? 'Save Changes' : 'Publish Application'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: INSPECT / UPDATE CLIENT REQUEST (FIXED HEADER & SCROLL) */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <div
              onClick={() => setSelectedRequest(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="relative w-full max-w-2xl max-h-[92vh] bg-[#0e0e12] rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 flex flex-col overflow-hidden"
            >
              {/* Permanent Fixed Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 shrink-0 bg-[#0e0e12]">
                <div>
                  <span className="text-[10px] font-['Space_Grotesk',monospace] uppercase text-neutral-400">
                    Request ID: {selectedRequest.id}
                  </span>
                  <h3 className="text-xl font-bold text-white font-['Syne',sans-serif]">
                    {selectedRequest.project_title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-1.5 rounded-xl bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-6">
                {/* Client Profile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-['Inter',sans-serif]">
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Client Name:</span>
                    <div className="text-white font-bold mt-0.5">{selectedRequest.client_name}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Email:</span>
                    <div className="text-white font-mono mt-0.5">
                      <a href={`mailto:${selectedRequest.client_email}`} className="hover:underline">
                        {selectedRequest.client_email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Service Type:</span>
                    <div className="text-white font-semibold mt-0.5">{selectedRequest.project_type || 'Web Design'}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Organization:</span>
                    <div className="text-white mt-0.5">{selectedRequest.client_company || 'Independent'}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Budget Range:</span>
                    <div className="text-white font-bold font-mono mt-0.5">{selectedRequest.budget_range}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-[11px]">Timeline:</span>
                    <div className="text-white font-mono mt-0.5">{selectedRequest.timeline || 'Flexible'}</div>
                  </div>
                </div>

                {/* Scope & Description */}
                <div className="space-y-2 text-xs">
                  <span className="text-neutral-400 uppercase font-mono text-[10px] tracking-wider">Project Scope & Description</span>
                  <p className="text-neutral-200 leading-relaxed bg-[#141418] p-3.5 rounded-xl border border-white/5">
                    {selectedRequest.description}
                  </p>
                  {selectedRequest.features_needed && (
                    <div className="pt-2">
                      <span className="text-neutral-400 font-semibold font-mono">Features Needed: </span>
                      <span className="text-white">{selectedRequest.features_needed}</span>
                    </div>
                  )}
                  {selectedRequest.reference_links && (
                    <div className="pt-1">
                      <span className="text-neutral-400 font-semibold font-mono">References: </span>
                      <a href={selectedRequest.reference_links} target="_blank" rel="noreferrer" className="text-white underline break-all">
                        {selectedRequest.reference_links}
                      </a>
                    </div>
                  )}
                </div>

                {/* Controls: Update Status, Priority, and Admin Notes */}
                <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-['Inter',sans-serif]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1 font-mono text-[11px]">Status</label>
                      <select
                        value={reqStatusUpdate}
                        onChange={(e) => setReqStatusUpdate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono focus:outline-none focus:border-white/40"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="accepted">Accepted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1 font-mono text-[11px]">Priority</label>
                      <select
                        value={reqPriorityUpdate}
                        onChange={(e) => setReqPriorityUpdate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white font-mono focus:outline-none focus:border-white/40"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 font-mono text-[11px]">Private Admin Notes & Milestones</label>
                    <textarea
                      rows={3}
                      placeholder="Add internal notes, quotes given, call dates..."
                      value={reqAdminNotes}
                      onChange={(e) => setReqAdminNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Permanent Fixed Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-white/10 shrink-0 bg-[#0e0e12] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteRequest(selectedRequest.id)}
                  className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/20 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Request</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isUpdatingReq}
                    onClick={handleSaveRequestUpdate}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isUpdatingReq ? 'Saving...' : 'Save Updates'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UNSAVED CHANGES / SAVE AS DRAFT PROMPT MODAL */}
      <AnimatePresence>
        {showExitPrompt && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePromptKeepEditing}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-md bg-[#121217] rounded-3xl border border-white/20 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">
                    Unsaved Project Changes
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    You have unsaved changes in this application. Would you like to save it as a draft so you can resume later, or discard your modifications?
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 text-xs font-['Inter',sans-serif]">
                <button
                  type="button"
                  onClick={handlePromptKeepEditing}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors font-medium text-center"
                >
                  Keep Editing
                </button>
                <button
                  type="button"
                  onClick={handlePromptDiscard}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Discard</span>
                </button>
                <button
                  type="button"
                  onClick={handlePromptSaveDraft}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save as Draft</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Draft Action Toast */}
      <AnimatePresence>
        {draftToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[80] px-4 py-3 rounded-2xl bg-[#141418] border border-white/20 shadow-2xl flex items-center gap-2.5 text-xs text-white font-mono"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{draftToast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
