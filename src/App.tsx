import { AccordionSub, type AccordionItemData } from './elements/Accordion'

const FaQ: AccordionItemData[] = [
  {
    value: 'Info',
    trigger: 'Apa itu FunikIn?',
    content: 'FunikIn adalah platform digital untuk berbagi pengalaman dan mendapatkan informasi terkini.'
  },
  {
    value: 'Tutor',
    trigger: 'Bagaimana cara mendaftar?',
    content: 'Anda dapat mendaftar melalui halaman utama dengan mengklik tombol Sign Up dan mengisi formulir yang tersedia.'
  },
  {
    value: 'Tarif',
    trigger: 'Apakah FunikIn gratis?',
    content: 'Ya, FunikIn menyediakan layanan gratis untuk semua pengguna dengan fitur-fitur dasar.'
  },
  {
    value: 'Support',
    trigger: 'Bagaimana cara menghubungi support?',
    content: 'Anda dapat menghubungi tim support kami melalui email support@funikin.com atau chat langsung di aplikasi.'
  }
];

export default function App() {
  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <AccordionSub items={FaQ} />
    </main>
  )
}