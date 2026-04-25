export interface Poll {
  id: string;
  title: string;
  question?: string;
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
    id: 'skewed-test',
    title: '민초 vs 반민초, 당신의 선택은?',
    question: '세기의 대결! 치약 맛이라고 조롱받는 민트초코와 그것을 진정한 디저트라고 믿는 민초파의 대결입니다. 하지만 이번 조사 결과는 한쪽으로 크게 치우친 것 같네요.',
    optionA: '민초는 사랑입니다 (민초파)',
    optionB: '치약은 닦을 때만 쓰세요 (반민초파)',
    votesA: 900,
    votesB: 100,
    creatorId: 'mint',
    creatorPw: '1234',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'max-test',
    title: '이것은정확히오십글자의길이를가진투표제목샘플입니다테스트를위해작성되었으며화면에서어떻게보이는지확인하기위함',
    question: '상세 내용 또한 최대 길이를 테스트하기 위해 작성되었습니다. 이 부분은 300자까지 가능하지만 현재는 제목과 선택지의 50자 제한이 화면 레이아웃에 어떤 영향을 주는지 확인하는 것이 주 목적입니다.',
    optionA: '왼쪽선택지내용도정확하게오십글자로맞추어보았습니다이내용이결과바안에서어떻게잘리는지확인해봅시다글자수테스트',
    optionB: '오른쪽선택지내용도정확하게오십글자로맞추어보았습니다이내용이결과바안에서어떻게잘리는지확인해봅시다글자수테스트',
    votesA: 50,
    votesB: 50,
    creatorId: 'test',
    creatorPw: '1234',
    createdAt: '2024-04-24T10:00:00Z',
  },
  {
    id: '1',
    title: '평생 한 종류의 면만 먹어야 한다면?',
    question: '비빔냉면은 매콤달콤한 소스와 쫄깃한 면발이 특징이며 여름철 최고의 별미로 꼽힙니다. 반면 돈코츠라면은 깊고 진한 돼지 사골 육수의 풍미와 부드러운 차슈가 어우러져 추운 날씨에 마음까지 따뜻하게 해주는 마력이 있습니다.',
    optionA: '비빔냉면',
    optionB: '돈코츠라면',
    votesA: 45,
    votesB: 55,
    creatorId: 'user1',
    creatorPw: '1234',
    createdAt: '2024-04-20T10:00:00Z',
  }
];
