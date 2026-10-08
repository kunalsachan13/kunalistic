import { NextRequest, NextResponse } from 'next/server';
import { sql, parseJsonField } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { BudgetPreset, DEFAULT_BUDGET_PRESETS } from '@/types';

export async function GET() {
  try {
    const rows = (await sql(
      "SELECT value FROM admin_config WHERE key = 'budget_presets' LIMIT 1"
    )) as Record<string, unknown>[];

    if (rows.length > 0 && rows[0].value) {
      const presets = parseJsonField<BudgetPreset[]>(rows[0].value, DEFAULT_BUDGET_PRESETS);
      if (Array.isArray(presets) && presets.length > 0) {
        return NextResponse.json({ success: true, data: presets });
      }
    }

    // Seed default presets if none exist yet
    await sql(
      `INSERT INTO admin_config (key, value, updated_at) 
       VALUES ('budget_presets', $1::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [JSON.stringify(DEFAULT_BUDGET_PRESETS)]
    );

    return NextResponse.json({ success: true, data: DEFAULT_BUDGET_PRESETS });
  } catch (error: unknown) {
    console.error('Error fetching budget presets:', error);
    return NextResponse.json({ success: true, data: DEFAULT_BUDGET_PRESETS });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const presets = body.presets as BudgetPreset[] | undefined;

    if (!presets || !Array.isArray(presets) || presets.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one budget preset is required' },
        { status: 400 }
      );
    }

    // Clean and validate presets
    const cleanedPresets: BudgetPreset[] = presets.map((p, idx) => ({
      id: p.id || `preset_${Date.now()}_${idx}`,
      label: (p.label || '').trim(),
      tag: (p.tag || 'CUSTOM').toUpperCase().trim(),
      desc: (p.desc || '').trim(),
    })).filter((p) => Boolean(p.label));

    if (cleanedPresets.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Budget preset labels cannot be blank' },
        { status: 400 }
      );
    }

    await sql(
      `INSERT INTO admin_config (key, value, updated_at) 
       VALUES ('budget_presets', $1::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [JSON.stringify(cleanedPresets)]
    );

    return NextResponse.json({
      success: true,
      message: 'Budget presets updated successfully',
      data: cleanedPresets,
    });
  } catch (error: unknown) {
    console.error('Error updating budget presets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update budget presets' },
      { status: 500 }
    );
  }
}
