import React, { useState } from 'react';

const Translator = () => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    const langCode = document.querySelector('#language-selector').value;
    const userInput = document.querySelector('#user-input').value;
    const textToSend = { text: userInput, langCode: langCode };                                                                                                              
    console.log('Sending request with data:', textToSend);

    console.log('Sending request with data:', textToSend);

    fetch('http://localhost:3001/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(textToSend),
        mode: 'cors',
      })
      .then(response => response.json())
      .then(data => {
        setTranslatedText(data.text);
        })
      .catch(error => {
          console.error(error);
          setTranslatedText('Error translating text');
        });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-xs md:max-w-sm lg:max-w-md p-2 pt-0 md:pt-0 lg:pt-0 bg-gray-800 rounded-md shadow-md">
        <h1 className="text-lg md:text-xl lg:text-2xl font-normal justify-center font-serif mb-4 text-white">Verbal Voyage</h1>
        <input
          id="user-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-1 pl-8 text-xs md:text-sm lg:text-base rounded-md mb-6 placeholder:text-black"
          placeholder="Enter text to translate"
        />
        <select
          id="language-selector"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full p-1 pl-8 text-xs md:text-sm lg:text-base rounded-md mb-6"
        >
            <option value="af">Afrikaans (Afrikaans)</option>
            <option value="sq">Shqip (Albanian)</option>
            <option value="am">አማርኛ (Amharic)</option>
            <option value="ar">العربية (Arabic)</option>
            <option value="hy">Հայերեն (Armenian)</option>
            <option value="as">অসমীয়া (Assamese)</option>
            <option value="az">Azərbaycan dili (Azerbaijani)</option>
            <option value="eu">Euskara (Basque)</option>
            <option value="be">Беларуская (Belarusian)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="bs">Bosanski (Bosnian)</option>
            <option value="bg">Български (Bulgarian)</option>
            <option value="ca">Català (Catalan)</option>
            <option value="zh-CN">中文 (Simplified Chinese)</option>
            <option value="zh-TW">中文 (Traditional Chinese)</option>
            <option value="co">Corsu (Corsican)</option>
            <option value="hr">Hrvatski (Croatian)</option>
            <option value="cs">Čeština (Czech)</option>
            <option value="da">Dansk (Danish)</option>
            <option value="nl">Nederlands (Dutch)</option>
            <option value="en">English (English)</option>
            <option value="eo">Esperanto (Esperanto)</option>
            <option value="et">Eesti (Estonian)</option>
            <option value="fi">Suomi (Finnish)</option>
            <option value="fr">Français (French)</option>
            <option value="fy">Frysk (Frisian)</option>
            <option value="gl">Galego (Galician)</option>
            <option value="ka">ქართული (Georgian)</option>
            <option value="de">Deutsch (German)</option>
            <option value="el">Ελληνικά (Greek)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
            <option value="ht">Kreyòl ayisyen (Haitian Creole)</option>
            <option value="he">עברית (Hebrew)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="hu">Magyar (Hungarian)</option>
            <option value="is">Íslenska (Icelandic)</option>
            <option value="id">Bahasa Indonesia (Indonesian)</option>
            <option value="ga">Gaeilge (Irish)</option>
            <option value="it">Italiano (Italian)</option>
            <option value="ja">日本語 (Japanese)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="kk">Қазақша (Kazakh)</option>
            <option value="km">ភាសាខ្មែរ (Khmer)</option>
            <option value="ko">한국어 (Korean)</option>
            <option value="ku">Kurdî (Kurdish)</option>
            <option value="ky">Кыргызча (Kyrgyz)</option>
            <option value="lo">ພາສາລາວ (Lao)</option>
            <option value="la">Latina (Latin)</option>
            <option value="lv">Latviešu (Latvian)</option>
            <option value="lt">Lietuvių (Lithuanian)</option>
            <option value="lb">Lëtzebuergesch (Luxembourgish)</option>
            <option value="mk">Македонски (Macedonian)</option>
            <option value="mg">Malagasy (Malagasy)</option>
            <option value="ms">Bahasa Melayu (Malay)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
            <option value="mt">Malti (Maltese)</option>
            <option value="mi">Te Reo Māori (Maori)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="mn">Монгол (Mongolian)</option>
            <option value="ne">नेपाली (Nepali)</option>
            <option value="no">Norsk (Norwegian)</option> 
            <option value="ny">Chichewa (Nyanja)</option> 
            <option value="oc">Occitan (Occitan)</option> 
            <option value="or">ଓଡ଼ିଆ (Oriya)</option> 
            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option> 
            <option value="pl">Polski (Polish)</option> 
            <option value="pt">Português (Portuguese)</option> 
            <option value="ro">Română (Romanian)</option> 
            <option value="ru">Русский (Russian)</option> 
            <option value="sd">سنڌي (Sindhi)</option> 
            <option value="si">සිංහල (Sinhala)</option> 
            <option value="sk">Slovenčina (Slovak)</option> 
            <option value="sl">Slovenščina (Slovenian)</option> 
            <option value="so">Soomaali (Somali)</option> 
            <option value="es">Español (Spanish)</option> 
            <option value="su">Basa Sunda (Sundanese)</option> 
            <option value="sw">Kiswahili (Swahili)</option> 
            <option value="sv">Svenska (Swedish)</option> 
            <option value="ta">தமிழ் (Tamil)</option> 
            <option value="te">తెలుగు (Telugu)</option> 
            <option value="th">ไทย (Thai)</option> 
            <option value="tr">Türkçe (Turkish)</option> 
            <option value="uk">Українська (Ukrainian)</option> 
            <option value="ur">اردو (Urdu)</option> 
            <option value="ug">ئۇيغۇرچە (Uyghur)</option> 
            <option value="uz">Ўзбек (Uzbek)</option> 
            <option value="vi">Tiếng Việt (Vietnamese)</option> 
            <option value="cy">Cymraeg (Welsh)</option> 
            <option value="xh">isiXhosa (Xhosa)</option> 
            <option value="yi">ייִדיש (Yiddish)</option> 
            <option value="yo">Yorùbá (Yoruba)</option> 
            <option value="zu">isiZulu (Zulu)</option>

        </select>
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-2 rounded-full"
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          onClick={handleTranslate}
        >
          Translate
        </button>
        <p className="mt-4 text-white">{translatedText}</p>
      </div>
    </div>
  );
};

export default Translator;