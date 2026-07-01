export type Impact = 'critical' | 'serious' | 'moderate' | 'minor';
export type FilterType = 'all' | Impact;

export interface AuditViolation {
  id: string;
  title: string;
  wcag: string;
  help: string;
  impact: Impact;
  nodes: string[];
}

export interface PassedCheck {
  id: string;
  title: string;
}

export interface AuditResult {
  url: string;
  score: number;
  violations: AuditViolation[];
  passed: PassedCheck[];
  auditedAt: string;
}

export interface RuleMeta {
  title: string;
  wcag: string;
  help: string;
  impact: Impact;
}
