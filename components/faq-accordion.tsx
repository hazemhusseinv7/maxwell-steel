import { Accordion } from "@heroui/react";
import { HiChevronDown, HiQuestionMarkCircle } from "react-icons/hi2";

interface FaqItem {
  question?: string;
  answer?: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const faqs = items.filter(
    (f): f is { question: string; answer: string } =>
      typeof f.question === "string" &&
      f.question.trim() !== "" &&
      typeof f.answer === "string" &&
      f.answer.trim() !== "",
  );
  if (faqs.length === 0) return null;
  return (
    <section aria-label="الأسئلة الشائعة" className="my-6">
      <Accordion variant="surface" className="w-full">
        {faqs.map((f, i) => (
          <Accordion.Item key={f.question} id={`faq-${i}`}>
            <Accordion.Heading>
              <Accordion.Trigger className="font-bold transition-colors hover:text-accent hover:no-underline">
                <HiQuestionMarkCircle
                  className="text-bronze me-3 size-4 shrink-0"
                  aria-hidden="true"
                />
                {f.question}
                <Accordion.Indicator>
                  <HiChevronDown
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="text-muted leading-8">
                {f.answer}
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}
