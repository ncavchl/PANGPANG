export interface Poll {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
  creatorId: string;
  creatorPw: string;
  createdAt: string;
}

export const MOCK_POLLS: Poll[] = [
  {
    id: '1',
    question: '평생 한 종류의 면만 먹어야 한다면?',
    optionA: '매콤달콤 비빔냉면',
    optionB: '진하고 고소한 돈코츠라면',
    votesA: 45,
    votesB: 55,
    creatorId: 'user1',
    creatorPw: '1234',
    createdAt: '2024-04-20T10:00:00Z',
  },
  {
    id: '2',
    question: '탕수육 찍먹 vs 부먹, 당신의 선택은?',
    optionA: '바삭함을 유지하는 찍먹',
    optionB: '소스가 잘 밴 촉촉한 부먹',
    votesA: 120,
    votesB: 118,
    creatorId: 'admin',
    creatorPw: 'password',
    createdAt: '2024-04-21T15:30:00Z',
  },
  {
    id: '3',
    question: '여름 휴가는 어디로?',
    optionA: '시원한 파도가 있는 바다',
    optionB: '피톤치드 가득한 계곡',
    votesA: 80,
    votesB: 40,
    creatorId: 'traveler',
    creatorPw: '7777',
    createdAt: '2024-04-22T09:00:00Z',
  }
];
