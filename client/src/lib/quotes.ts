import type { Quote } from "@shared/schema";

export const defaultQuotes: Omit<Quote, "id">[] = [
  {
    textEn: "Prayer is the key to every treasure.",
    textAr: "الصلاة مفتاح كل كنز.",
    category: "faith",
    isCustom: false,
  },
  {
    textEn: "The best among you are those who learn the Quran and teach it.",
    textAr: "خيركم من تعلم القرآن وعلمه.",
    category: "faith",
    isCustom: false,
  },
  {
    textEn: "Allah does not burden a soul beyond that it can bear.",
    textAr: "لا يكلف الله نفساً إلا وسعها.",
    category: "faith",
    isCustom: false,
  },
  {
    textEn: "Focus on the step in front of you, not the whole staircase.",
    textAr: "ركز على الخطوة أمامك، وليس الدرج بأكمله.",
    category: "productivity",
    isCustom: false,
  },
  {
    textEn: "Small daily improvements are the key to staggering long-term results.",
    textAr: "التحسينات اليومية الصغيرة هي مفتاح النتائج الكبيرة على المدى الطويل.",
    category: "productivity",
    isCustom: false,
  },
  {
    textEn: "Success is the sum of small efforts repeated day in and day out.",
    textAr: "النجاح هو مجموع الجهود الصغيرة المتكررة يوماً بعد يوم.",
    category: "productivity",
    isCustom: false,
  },
  {
    textEn: "Champions are made when no one is watching.",
    textAr: "الأبطال يُصنعون عندما لا يراقبهم أحد.",
    category: "football",
    isCustom: false,
  },
  {
    textEn: "The difference between impossible and possible lies in determination.",
    textAr: "الفرق بين المستحيل والممكن يكمن في العزيمة.",
    category: "football",
    isCustom: false,
  },
  {
    textEn: "Talent wins games, but teamwork wins championships.",
    textAr: "الموهبة تفوز بالمباريات، لكن العمل الجماعي يفوز بالبطولات.",
    category: "football",
    isCustom: false,
  },
  {
    textEn: "Indeed, with hardship comes ease.",
    textAr: "إن مع العسر يسراً.",
    category: "faith",
    isCustom: false,
  },
  {
    textEn: "Verily, remembrance of Allah is the greatest.",
    textAr: "ولذكر الله أكبر.",
    category: "faith",
    isCustom: false,
  },
  {
    textEn: "Your time is limited, don't waste it living someone else's life.",
    textAr: "وقتك محدود، لا تضيعه في عيش حياة شخص آخر.",
    category: "productivity",
    isCustom: false,
  },
];

export const quranicVerses = [
  {
    textEn: "So verily, with hardship comes ease. Verily, with hardship comes ease.",
    textAr: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    reference: "Quran 94:5-6",
  },
  {
    textEn: "And He found you lost and guided you.",
    textAr: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
    reference: "Quran 93:7",
  },
  {
    textEn: "Indeed, my Lord is near and responsive.",
    textAr: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ",
    reference: "Quran 11:61",
  },
  {
    textEn: "And whoever relies upon Allah - then He is sufficient for him.",
    textAr: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    reference: "Quran 65:3",
  },
  {
    textEn: "Indeed, Allah is with those who are patient.",
    textAr: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    reference: "Quran 2:153",
  },
];

export const productivityTips = [
  {
    textEn: "Focus for 25 minutes without distraction, then take a 5-minute break.",
    textAr: "ركز لمدة 25 دقيقة دون تشتيت، ثم خذ استراحة لمدة 5 دقائق.",
  },
  {
    textEn: "Plan your day the night before for maximum productivity.",
    textAr: "خطط ليومك في الليلة السابقة لتحقيق أقصى إنتاجية.",
  },
  {
    textEn: "Start with your most challenging task when your energy is highest.",
    textAr: "ابدأ بأصعب مهامك عندما تكون طاقتك في أعلى مستوياتها.",
  },
  {
    textEn: "Break large goals into smaller, actionable steps.",
    textAr: "قسم الأهداف الكبيرة إلى خطوات أصغر قابلة للتنفيذ.",
  },
  {
    textEn: "Remove distractions from your workspace for better focus.",
    textAr: "أزل المشتتات من مساحة عملك لتركيز أفضل.",
  },
];
