import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Kita definisikan struktur data untuk setiap baris accordion
export interface AccordionItemData {
  value: string;
  trigger: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export function AccordionSub({ items, className = "max-w-lg" }: AccordionProps) {
  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}