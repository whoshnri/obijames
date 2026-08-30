export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Placeholder testimonial copy. Replace with client feedback on leadership development, team effectiveness, or organisational impact.",
    name: "Client Name",
    role: "Chief People Officer",
    company: "Organisation Name",
    image: "/obi1.jpeg",
  },
  {
    id: "2",
    quote:
      "Placeholder testimonial copy. Replace with a second client perspective on working with Obi James Consultancy.",
    name: "Client Name",
    role: "Chief Executive Officer",
    company: "Organisation Name",
    image: "/obi6.jpeg",
  },
  {
    id: "3",
    quote:
      "Placeholder testimonial copy. Replace with a third client perspective on diagnostics, programmes, or advisory work.",
    name: "Client Name",
    role: "HR Director",
    company: "Organisation Name",
    image: "/obi3.jpeg",
  },
  {
    id: "4",
    quote:
      "Placeholder testimonial copy. Replace with a fourth client perspective on building shared leadership capability.",
    name: "Client Name",
    role: "Board Chair",
    company: "Organisation Name",
    image: "/obi5.jpeg",
  },
];
