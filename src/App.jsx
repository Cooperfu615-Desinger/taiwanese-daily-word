import React, { useState, useEffect } from 'react';
import { Calendar, Shuffle, Info, ChevronRight, Share2, MessageCircle, Wind, Mic, Volume2 } from 'lucide-react';

/**
 * 數據庫：台語疊字
 * 包含：漢字、台羅拼音、意境色(Hex)、意思、例句/情境、類別(如：視覺、觸覺)、詳細解說
 */
const WORDS_DB = [
  {
    id: 'angkiki',
    word: '紅吱吱',
    romaji: 'Âng-ki-ki',
    hex: '#D32F2F', // 鮮紅
    isDark: true,
    category: '視覺',
    context: {
      sentence: "伊穿一領紅吱吱的衫，看起來真喜氣。",
      meaning: "形容紅色非常鮮豔、搶眼。"
    },
    desc: "「吱吱」是形容色彩飽和度極高的狀態。通常用於形容衣服、花朵或是喜慶場合的裝飾，給人一種熱情、充滿活力的感覺。類似的還有「紅記記」(Âng-kì-kì)。"
  },
  {
    id: 'pehsutsut',
    word: '白雪雪',
    romaji: 'Pe̍h-sut-sut',
    hex: '#F5F5F5', // 雪白
    isDark: false,
    category: '視覺',
    context: {
      sentence: "棉被洗甲白雪雪，曝佇日頭腳真芳。",
      meaning: "形容非常潔白，乾淨得像雪一樣。"
    },
    desc: "用「雪」來形容白的程度，既強調了顏色的純度，也帶有一種乾淨、清新的意象。常用來形容皮膚、衣物或牆面。"
  },
  {
    id: 'ososo',
    word: '烏趖趖',
    romaji: 'O͘-sô-sô',
    hex: '#212121', // 漆黑
    isDark: true,
    category: '視覺',
    context: {
      sentence: "規間厝暗摸摸，烏趖趖，行路愛細二。",
      meaning: "形容非常黑暗，伸手不見五指；或形容髒得發黑。"
    },
    desc: "「趖趖」加強了黑的程度，有時帶有一種令人不安或是不乾淨的負面語氣。與之相似的還有「烏魯魯」(O͘-lu-lu) 或 「烏嘛嘛」(O͘-mà-mà)。"
  },
  {
    id: 'kimsihsih',
    word: '金爍爍',
    romaji: 'Kim-sih-sih',
    hex: '#FFD700', // 金色
    isDark: false,
    category: '光影',
    context: {
      sentence: "日頭出來矣，海面金爍爍，真媠。",
      meaning: "形容光芒閃耀，非常刺眼或華麗。"
    },
    desc: "「爍爍」描繪了光線閃動的樣子。這個詞常用來形容陽光下的水面、黃金飾品，或是某人打扮得光鮮亮麗。"
  },
  {
    id: 'siothngthng',
    word: '燒燙燙',
    romaji: 'Sio-thǹg-thǹg',
    hex: '#FF5722', // 熱橘
    isDark: true,
    category: '觸覺',
    context: {
      sentence: "這碗麵燒燙燙，你食的時陣愛注意。",
      meaning: "形容溫度很高，非常燙手或燙口。"
    },
    desc: "「燙燙」直接傳達了溫度的熾熱感。在台灣的飲食文化中，食物趁熱吃是美味的象徵，但也常用這個詞來提醒別人小心。"
  },
  {
    id: 'lengpingping',
    word: '冷冰冰',
    romaji: 'Léng-ping-ping',
    hex: '#81D4FA', // 冰藍
    isDark: false,
    category: '觸覺',
    context: {
      sentence: "伊的手冷冰冰，敢是受風寒？",
      meaning: "形容溫度極低，像冰一樣；也形容態度冷淡。"
    },
    desc: "除了形容物體的物理溫度，這個詞也常轉用於形容人際關係的疏離，或是臉色不好看、毫無熱情。"
  },
  {
    id: 'tinbutbut',
    word: '甜粅粅',
    romaji: 'Tiⁿ-but-but',
    hex: '#F48FB1', // 甜粉
    isDark: false,
    category: '味覺',
    context: {
      sentence: "這杯奶茶甜粅粅，我食無合。",
      meaning: "形容味道非常甜，甚至甜到有點膩人。"
    },
    desc: "「粅粅」這種疊字帶有一種黏稠、濃郁的感覺。這個詞通常帶有一點點負面意味，暗示甜度超過了適當的範圍，或者形容人嘴巴很甜（可能有企圖）。"
  },
  {
    id: 'kiamtoktok',
    word: '鹹篤篤',
    romaji: 'Kiâm-tok-tok',
    hex: '#795548', // 醬油褐
    isDark: true,
    category: '味覺',
    context: {
      sentence: "這盤菜落傷濟鹽，鹹篤篤。",
      meaning: "形容味道死鹹，非常難以入口。"
    },
    desc: "「篤篤」給人一種硬邦邦、死板的感覺，用來形容鹹味，表示那種鹹是不帶層次的、令人皺眉的重鹹。"
  },
  {
    id: 'busasa',
    word: '霧嗄嗄',
    romaji: 'Bū-sà-sà',
    hex: '#9E9E9E', // 霧灰
    isDark: true,
    category: '狀態',
    context: {
      sentence: "聽伊講甲霧嗄嗄，完全聽無。",
      meaning: "形容視線模糊不清，引申為搞不清楚狀況、一頭霧水。"
    },
    desc: "「嗄嗄」模擬了在霧中看不清東西的迷茫感。現代生活中最常用於形容對某件事理解混亂，腦袋一片混亂的狀態。"
  },
  {
    id: 'chhiohaihai',
    word: '笑咍咍',
    romaji: 'Chhiò-hai-hai',
    hex: '#FFCC80', // 暖黃
    isDark: false,
    category: '表情',
    context: {
      sentence: "看伊笑咍咍，應該是有啥物好代誌。",
      meaning: "形容笑得很開心、很燦爛的樣子。"
    },
    desc: "「咍咍」是對笑聲或笑貌的描寫。這個詞充滿了正向的情緒，讓人聽了也能感受到那份喜悅與輕鬆。"
  },
  {
    id: 'nngsiusiu',
    word: '軟修修',
    romaji: 'Nn̄g-siû-siû',
    hex: '#E1BEE7', // 軟紫
    isDark: false,
    category: '觸覺',
    context: {
      sentence: "這塊麵包軟修修，真好食。",
      meaning: "形容質地非常柔軟、蓬鬆。"
    },
    desc: "「修修」常用來形容物體極度柔軟，甚至有點缺乏支撐力的狀態。可以用來形容食物（如麻糬、麵包），也可以形容人無力攤在椅子上。"
  },
  {
    id: 'yliauliau',
    word: '活跳跳',
    romaji: 'Oa̍h-thiàu-thiàu',
    hex: '#76FF03', // 鮮綠
    isDark: false,
    category: '動態',
    context: {
      sentence: "這尾魚猶活跳跳，一定真鮮。",
      meaning: "形容非常有活力，生猛活躍的樣子。"
    },
    desc: "最常用於形容海鮮的新鮮程度，指魚蝦還在跳動。引申為形容人精力旺盛，充滿生命力。"
  }
];

// 獲取一年中的第幾天
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// 複製到剪貼簿
const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy', err);
    }
    document.body.removeChild(textArea);
};

const App = () => {
  const [wordData, setWordData] = useState(WORDS_DB[0]);
  const [mode, setMode] = useState('daily'); // 'daily' or 'browse'
  const [showInfo, setShowInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 根據日期初始化
  useEffect(() => {
    const dayOfYear = getDayOfYear();
    const index = dayOfYear % WORDS_DB.length;
    setWordData(WORDS_DB[index]);
  }, []);

  // 切換隨機
  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * WORDS_DB.length);
    setWordData(WORDS_DB[randomIndex]);
    setMode('browse');
  };

  // 回到今日
  const handleToday = () => {
    const dayOfYear = getDayOfYear();
    const index = dayOfYear % WORDS_DB.length;
    setWordData(WORDS_DB[index]);
    setMode('daily');
  };

  // 處理複製
  const handleShare = () => {
    const text = `【${wordData.word}】(${wordData.romaji})\n意思：${wordData.context.meaning}\n例句：${wordData.context.sentence}\n來自「台語・疊字每日」`;
    copyToClipboard(text);
    alert("內容已複製到剪貼簿，分享給朋友做伙學台語！");
  };

  // 處理發音
  const handleSpeak = (e) => {
    e.stopPropagation(); // 防止冒泡
    
    if (!('speechSynthesis' in window)) {
      alert("您的瀏覽器不支援語音播放。");
      return;
    }

    // 如果正在播放，先停止
    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(wordData.word);
    // 嘗試設定為 zh-TW。若裝置無台語引擎，通常會回退到國語。
    utterance.lang = 'zh-TW'; 
    utterance.rate = 0.8; // 語速稍慢
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // 文字顏色樣式（根據背景深淺）
  const transitionClass = 'transition-colors duration-700';
  const textColorClass = wordData.isDark ? 'text-white/95' : 'text-stone-800';
  const borderColorClass = wordData.isDark ? 'border-white/30' : 'border-stone-800/20';

  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-[#F2F0EB] font-serif selection:bg-stone-300 ${transitionClass} ease-in-out`}>
      {/* 背景紋理 (模擬舊紙張) */}
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 w-full max-w-md lg:max-w-4xl p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* 左側：字卡展示區 */}
        <div 
          className={`relative w-full lg:w-1/2 aspect-[4/5] lg:aspect-[3/4] rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ease-out group`}
          style={{ backgroundColor: wordData.hex }}
        >
          {/* 內部裝飾紋理 */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
          ></div>

          {/* 全版面 Flex 佈局 */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            
            {/* 上半部：拼音 + 日期 */}
            <div className="flex justify-between items-start h-1/3">
               {/* 拼音 - 豎排 */}
               <div className={`text-xl tracking-[0.15em] font-serif italic opacity-80 ${textColorClass} ${transitionClass}`} style={{ writingMode: 'vertical-rl' }}>
                  {wordData.romaji}
               </div>

               {/* 日期與類別 */}
               <div className={`flex flex-col items-end gap-4 ${textColorClass} ${transitionClass}`}>
                 <div className="text-right">
                   <span className={`text-xs tracking-widest opacity-80 uppercase ${transitionClass}`}>
                     {mode === 'daily' ? '今日・台語' : '探索・台語'}
                   </span>
                   <div className={`text-3xl font-light font-serif mt-1 ${transitionClass}`}>
                     {new Date().getDate()}
                     <span className="text-sm ml-1 align-top opacity-70">日</span>
                   </div>
                 </div>

                 <div className={`w-8 py-2 border ${borderColorClass} flex flex-col items-center justify-center gap-1 opacity-80 ${transitionClass}`}>
                    <span className="text-[10px] opacity-60" style={{ writingMode: 'vertical-rl' }}>類別</span>
                    <span className="text-lg font-serif font-medium" style={{ writingMode: 'vertical-rl' }}>
                      {wordData.category}
                    </span>
                 </div>
               </div>
            </div>

            {/* 下半部：漢字 + 釋義 */}
            <div className="flex flex-col gap-6 flex-1 justify-end">
               {/* 漢字 - 靠左下 */}
               <h1 className={`text-7xl lg:text-8xl font-bold tracking-widest drop-shadow-lg leading-none ${textColorClass} ${transitionClass}`} style={{ fontFamily: '"Noto Serif TC", serif' }}>
                  {wordData.word}
               </h1>

               {/* 簡單釋義 */}
               <div className="flex justify-end">
                 <div className={`px-5 py-3 rounded-lg border ${borderColorClass} backdrop-blur-sm text-sm tracking-wide font-medium max-w-[80%] text-justify shadow-sm ${textColorClass} ${transitionClass}`}>
                    {wordData.context.meaning.split('，')[0]}
                 </div>
               </div>
            </div>

          </div>
          
          {/* 發音按鈕 - 懸停時顯示 - 居中偏上 */}
           <button 
             onClick={handleSpeak}
             title="點擊播放（需裝置支援台語語音，否則可能為國語發音）"
             className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
               w-24 h-24 rounded-full flex items-center justify-center 
               transition-all duration-500 cursor-pointer
               ${isSpeaking ? 'scale-110 opacity-100 bg-white/20 backdrop-blur-sm' : 'opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white/10'}
             `}
           >
             {isSpeaking ? (
               <Volume2 className={`w-12 h-12 ${textColorClass} animate-pulse`} />
             ) : (
               <Mic className={`w-12 h-12 ${textColorClass} opacity-80`} />
             )}
           </button>
        </div>

        {/* 右側/底部：詳細資訊區 */}
        <div className="flex-1 flex flex-col justify-between py-2 lg:py-6">
          
          {/* 例句卡片 */}
          <div className="flex-1 flex flex-col justify-center items-center text-center lg:items-start lg:text-left mb-8 lg:pl-8 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-stone-300 hidden lg:block"></div>
            
            <MessageCircle className="w-5 h-5 text-stone-400 mb-6 mx-auto lg:mx-0" />

            {/* 例句 - 豎排 */}
            <div className="space-y-6 mb-8 h-64 lg:h-80 flex flex-col justify-center">
              <p className="text-2xl lg:text-3xl text-stone-800 leading-loose tracking-wide font-serif font-medium mx-auto lg:mx-0" style={{writingMode: 'vertical-rl', height: '100%'}}>
                 「{wordData.context.sentence}」
              </p>
            </div>
            
            <div className="flex flex-col items-center lg:items-start gap-1 w-full">
              <div className="h-[1px] w-12 bg-stone-300 mb-2 lg:hidden"></div>
              <p className="text-sm text-stone-500 tracking-widest">
                 釋義：{wordData.context.meaning}
              </p>
            </div>
          </div>

          {/* 備註與操作區 */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-sm border border-white/50">
            
            {/* 展開詳細說明 */}
            <div className="mb-4">
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-2 text-stone-800 font-bold text-sm hover:text-stone-600 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>每日一得</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${showInfo ? 'rotate-90' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showInfo ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                <p className="text-stone-600 text-sm leading-7 text-justify border-l-2 border-stone-300 pl-3">
                  {wordData.desc}
                </p>
              </div>
            </div>

            {/* 控制按鈕 */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
               <div className="flex gap-2">
                 <button 
                   onClick={handleToday}
                   className={`p-2 rounded-full transition-colors ${mode === 'daily' ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'}`}
                   title="今日一詞"
                 >
                   <Calendar className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={handleRandom}
                   className="p-2 rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition-colors"
                   title="隨機探索"
                 >
                   <Shuffle className="w-4 h-4" />
                 </button>
               </div>

               <button 
                 onClick={handleShare}
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2F0EB] hover:bg-[#E6E2D6] text-stone-700 text-xs font-bold tracking-wider transition-colors"
               >
                 <Share2 className="w-3 h-3" />
                 推廣台語
               </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* 底部裝飾字 */}
      <div className="fixed bottom-4 text-stone-400 text-[10px] tracking-widest opacity-50 mix-blend-multiply uppercase">
         Daily Taiwanese Words
      </div>
    </div>
  );
};

export default App;