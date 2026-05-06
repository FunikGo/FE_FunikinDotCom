// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccordionSub, type AccordionItemData } from './elements/Accordion';
import { ButtonGroupEl } from './elements/ButtonGroup';
// Ubah 'qna' menjadi 'QnA' (Huruf Kapital) agar React mengenalinya sebagai komponen
// import QnA from './QnA/qna'; 

// --- DATA FAQ ---
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


function FaqPage() {
  return (
    <main className="p-5 flex flex-col justify-center items-center">
      <AccordionSub items={FaQ} />
    </main>
  );
}

function ButtonHeader() {
  return (
    <main>
      <ButtonGroupEl />
    </main>
  )
}

// function QnAPage() {
//   return (
//       <QnA /> 
//   );
// }

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* Halaman FAQ (Default/Home) */}
    //     <Route path="/" element={<FaqPage />} />
        
    //     {/* Halaman Input QnA (Direct Link funikin.com/qna)[cite: 1] */}
    //     <Route path="/qna" element={<QnAPage />} />
        
    //     {/* Fallback jika link salah */}
    //     <Route path="*" element={<FaqPage />} />
    //   </Routes>
    // </BrowserRouter>
    <main>
      <header className='w-full p-2 shadow-sm flex justify-between items-center'>
        <h1>FunikIn</h1>
        <ButtonHeader />
      </header>
        <FaqPage />
    </main>
  );
}