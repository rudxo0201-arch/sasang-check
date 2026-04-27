import { CheckDefinition, BaseResultContent } from '@/lib/engine/types';
import sasangCheck from './sasang';
import hanyeolCheck from './hanyeol';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allChecks: CheckDefinition<any, any, any>[] = [
  sasangCheck,
  hanyeolCheck,
];

export function getCheck(id: string): CheckDefinition<string, BaseResultContent, unknown> | undefined {
  return allChecks.find((c) => c.id === id);
}

export function getLiveChecks(): CheckDefinition<string, BaseResultContent, unknown>[] {
  return allChecks.filter((c) => c.hubCard.status === 'live');
}

export function getAllChecks(): CheckDefinition<string, BaseResultContent, unknown>[] {
  return allChecks;
}

export function getResultContent(checkId: string, resultKey: string): BaseResultContent | undefined {
  const check = getCheck(checkId);
  return check?.content[resultKey];
}

export { sasangCheck, hanyeolCheck };
