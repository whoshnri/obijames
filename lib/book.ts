export const bookLinks = {
  amazonUk: "https://www.amazon.co.uk/dp/B0BDXM2CYW",
  amazonUs:
    "https://www.amazon.com/dp/B0BDXM2CYW/ref=cm_sw_em_r_mt_dp_X0VNGE7WFPXNVPWQY4J7",
  audiobookPdf:
    "https://obijames.com/wp-content/uploads/2020/08/Let-go-Leadership-Accompanying-Audio-book-Pdf.pdf",
  contact: "/contact",
  freeChapter: "/contact",
  trailerYoutubeId: "hCya17C4LXc",
  interviewYoutubeId: "Pe9bJoop-Tw",
} as const;

export const bookMeta = {
  title: "Let Go Leadership",
  subtitle:
    "How inclusive leaders share power to drive high performance",
  coverImage: "/book.png",
  coverAlt: "Let Go Leadership book cover by Obi James",
  featureImage: "/book-home-page.png",
  featureAlt:
    "Let Go Leadership available as ebook, audiobook and paperback by Obi James",
  formatsBadgeImage: "/book.png",
  formatsBadgeAlt:
    "Let Go Leadership Amazon bestseller available on Audible, ebook and paperback",
} as const;

export const bookIntro =
  "In this book, I demonstrate that a truly inclusive world can only become a reality when we can all unreservedly embrace the diversity of those around us. It is not enough just to surround yourself with a diverse team: only through inclusive leadership will you be able to successfully harness the collective wisdom, creativity and talent that diversity offers.";

export const bookBulkNote =
  "For any enquiries regarding discounts and stock for bulk orders, please get in touch via our contact us page.";

export const bookAudience = [
  "Are an experienced leader whose business is growing and challenging you in different ways.",
  "Feel held back by limited resources.",
  "Feel like your diversity efforts are not creating the value you expect.",
  "Need your teams to step up and take more responsibility for your collective success.",
  "Worry about letting go and sharing power.",
  "Struggle with employee engagement, absenteeism and talent retention.",
  "Are drained by leadership, stressed and close to burnout.",
] as const;

export const bookInterview = {
  title:
    "Leadership for the Future: My Interview on Channels Television Global Business News",
  body: "In this conversation with Juliana Olayinka, we explore key ideas from Let Go Leadership and their relevance for leaders everywhere. Though focused on Nigeria’s evolving business landscape, these principles - empowering teams, breaking hierarchies, and unlocking potential - offer universal lessons for building inclusive, high-performing workplaces.",
  ctaLabel: "Discover more by grabbing your copy of Let Go Leadership today",
} as const;

export type BookReview = {
  quote: string;
  attribution: string;
};

export const bookReviews: BookReview[] = [
  {
    quote:
      "Let Go Leadership is packed with powerful insights, practical tools, anecdotes, self-assessments and step-by-step instructions that will equip you to identify the limiting leadership beliefs, behaviours and tendencies that can hold you back from creating a truly inclusive environment where every individual can thrive. It’s not one-size-fits-all.\n\nThis thought-provoking book puts accountability for talent development, retention and inclusion firmly in the hands of the leader. It will help you recognise your own biases, build high-performing teams and, ultimately, create an environment that is truly welcoming to all. It is a must-read for every experienced leader wanting to make an impact on DE&I.",
    attribution: "Pamela Hutchinson OBE, Global Head of D&I, Bloomberg",
  },
  {
    quote:
      "Let Go Leadership offers powerful and compelling insights and sets us on a path of self-exploration and reflection, gently nudging us to the fascinating SHARE Leadership framework and offering ways in which this can be sustained, all of which is geared to make leaders inclusive. By offering a wide range of insights gleaned as a leader and as a coach, Obi James makes an important distinction between diversity and inclusion, challenges many of our current approaches to leadership, and makes the reader feel comfortable in reflecting on their own leadership journeys. In doing so, she connects the reader intimately to their daily challenges, and while reading, one often gets the “that is me” feeling, making it so very personal. She also wraps the reader in an amazing sense of reassurance, by being non-judgemental, leading them to explore their own potential, and empowering them to unlock it. In today’s world, this is a refreshing and radical relook at leadership, and hence a must-read for every leader who seeks to be inclusive and impactful.",
    attribution:
      "Girish Menon, CEO, STIR Education, recognised as one of the 25 most influential CEOs by the Charity Times 2019 and Top 10 Charity Champions in Global Diversity List 2020",
  },
  {
    quote:
      "As an experienced leader, it isn’t often that a leadership book makes me stop, think, re-read and reflect - but Let Go Leadership did just that. Obi has managed to write down what many leaders are feeling and thinking daily, and also give them a set of tools that are clear, practical and easy to implement. In a space where we often overcomplicate, it is so refreshing to find a simple but effective guide that can work for all styles of leadership and experience levels. I challenge any leader to read this and not find a paragraph that could have been written for them.",
    attribution: "Melanie Seymour, Advisory Board, Women in Banking & Finance",
  },
  {
    quote:
      "Key to the success of Let Go Leadership is the access it provides to many years of real-life experience through Obi James’s extensive work in this field. It shares powerful insights across a wide range of business models, with practical key lessons, tools and techniques, in an easy-to-read format. This, combined with a deep understanding of global shifts in the workplace, makes the book essential for today’s thought leaders.",
    attribution: "Taponeswa Mavunga, Director of Africa, Sony Music UK",
  },
  {
    quote:
      "This is the book that I have long been waiting for. In Let Go Leadership Obi James guides you through an abundance of development tools and invites you to self-explore via the leadership archetypes. She also offers guidance on how to overcome limitations by sharpening self-awareness and applying her SHARE Leadership method. This book will lead you on a liberating journey to discover and trust your inner pioneer. Obi invites you to reflect and reset, helping your transition to fully inclusive and sustainable Let Go Leadership. Challenge yourself and the status quo - be a rebel with a cause.",
    attribution:
      "Melanie Grabe, Director, Head of Corporate Access, Deutsche Bank",
  },
  {
    quote:
      "Let Go Leadership is a leadership reflection and journaling guide. It is one book to read with a marker and writing materials at hand, because it so often calls for pause, reflection and candid conversations on our strengths and areas for growth as leaders. I found myself furiously highlighting leadership gems right from the introduction and thinking, “More leaders and leadership teams should read this!”\n\nWhile it is an effortless read, that should not be mistaken for a lack of depth. Obi successfully manages the delicate balance of writing a profound text while also making it easy to engage with the content. Obi’s stories feel personal and relatable. They make this book read like a conversation with a trusted friend who’s guiding you through the potential pitfalls of leadership. It gets you to rethink and reframe your approach by first acknowledging your own tendencies or histories that colour how you move through the world. Beyond leadership and the professional sphere, there are aspects of the content that are also applicable to personal relationships.\n\nThis book will make many feel seen and heard, because it speaks to multiple leadership styles. In reading it, I felt seen, heard and challenged to regularly question how I show up as a leader.",
    attribution:
      "Mukhaye Muchimuti, Chief of Staff to the CEO, One Acre Fund, Kenya",
  },
  {
    quote:
      "I read Let Go Leadership just before starting my first managing director role, and I couldn’t think of a more useful book to prepare me for building trust with and empowering my leadership team. I’d recommend this to any new senior leader.",
    attribution: "Lisa Anderson, Managing Director, Black Cultural Archives",
  },
  {
    quote:
      "Through Let Go Leadership, Obi shares the insights and experiences that have resulted in her unique understanding of leaders and the dynamics of effective teams. As someone who has developed and worked with both small and large teams, the need to let go in a healthy and considered way resonated with me. The profiles around leadership archetypes helped me to understand my style of leadership and to recognise that I personally span several of the categories. With this awareness comes an opportunity to evolve and develop. This book will challenge you as a leader and, ultimately, as a person.",
    attribution:
      "Neil Rodford, former Group CEO, YMU, and Executive Director, Voly Music",
  },
];
