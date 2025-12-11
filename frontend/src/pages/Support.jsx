// // import React, { useState } from "react";
// // import { Send, Bot, User } from "lucide-react";

// // export default function Support() {
// //   const [messages, setMessages] = useState([
// //     { role: "bot", text: "Namaste! 🙏 How can I help you with the complaint system today?" }
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const API_KEY = import.meta.env.VITE_KEY 
// // const sendMessage = async () => {
// //   if (!input.trim()) return;

// //   const newMessage = { role: "user", text: input };
// //   setMessages((prev) => [...prev, newMessage]);
// //   setInput("");
// //   setLoading(true);

// //   try {
// //     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "Authorization": `Bearer ${API_KEY}`,
// //         "HTTP-Referer": window.location.origin,
// //         "X-Title": "SGIMS Support Assistant"
// //       },
// //       body: JSON.stringify({
// //         model: "deepseek/deepseek-chat",  // FREE MODEL
// //         messages: [
// //           { role: "system", content: "You are a helpful assistant for a government complaint management system. Answer politely and clearly." },
// //           { role: "user", content: input }
// //         ]
// //       })
// //     });

// //     const data = await res.json();

// //     const aiReply =
// //       data?.choices?.[0]?.message?.content ||
// //       "Sorry, I couldn't understand.";

// //     setMessages((prev) => [...prev, { role: "bot", text: aiReply }]);
// //   } catch (err) {
// //     setMessages((prev) => [
// //       ...prev,
// //       { role: "bot", text: "OpenRouter error. Please try again later." }
// //     ]);
// //   }

// //   setLoading(false);
// // };


// //   return (
// //     <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
// //       <h1 className="text-2xl font-bold text-[#003366] mb-4">
// //         AI Support Assistant 🤖
// //       </h1>

// //       <div className="bg-white shadow p-4 rounded-lg flex-1 overflow-y-auto space-y-4 border">
// //         {messages.map((msg, index) => (
// //           <div
// //             key={index}
// //             className={`flex items-start space-x-2 ${
// //               msg.role === "user" ? "justify-end" : "justify-start"
// //             }`}
// //           >
// //             {msg.role === "bot" && (
// //               <div className="bg-blue-600 text-white p-2 rounded-full">
// //                 <Bot size={18} />
// //               </div>
// //             )}

// //             <div
// //               className={`p-3 rounded-lg max-w-xs ${
// //                 msg.role === "user"
// //                   ? "bg-green-500 text-white"
// //                   : "bg-gray-200 text-black"
// //               }`}
// //             >
// //               {msg.text}
// //             </div>

// //             {msg.role === "user" && (
// //               <div className="bg-green-600 text-white p-2 rounded-full">
// //                 <User size={18} />
// //               </div>
// //             )}
// //           </div>
// //         ))}

// //         {loading && (
// //           <p className="text-gray-500 italic">Thinking...</p>
// //         )}
// //       </div>

// //       {/* INPUT BOX */}
// //       <div className="mt-4 flex items-center bg-white p-3 rounded-lg shadow">
// //         <input
// //           type="text"
// //           placeholder="Ask me anything about complaints..."
// //           className="flex-1 outline-none p-2 text-gray-700"
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //         />
// //         <button
// //           onClick={sendMessage}
// //           className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
// //         >
// //           <Send size={18} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


























// import React, { useState, useEffect, useRef } from "react";
// import { Send, Bot, User, HelpCircle, AlertCircle, Clock, Shield, Phone, Mail } from "lucide-react";

// export default function Support() {
//   const [messages, setMessages] = useState([
//     { role: "bot", text: "Namaste! 🙏 How can I help you with the complaint system today?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);
// const API_KEY = import.meta.env.VITE_KEY;

// const sendMessage = async () => {
//   if (!input.trim()) return;

//   const newMessage = { role: "user", text: input };
//   setMessages((prev) => [...prev, newMessage]);
//   setInput("");
//   setLoading(true);

//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${API_KEY}`,
//         "HTTP-Referer": window.location.origin,
//         "X-Title": "SGIMS Support Assistant"
//       },
//       body: JSON.stringify({
//   model: "deepseek/deepseek-chat",
//   messages: [
//     {
//       role: "system",
//       content: `
// You are a highly structured government support assistant.

// Whenever the user asks anything, ALWAYS answer in this format:

// 📌 **Title / Summary**

// 1️⃣ **Step-by-step answer**
// - Short, clear, numbered steps.
// - Use bold headings.
// - Keep answers crisp and readable.

// 📘 **Important Notes**
// - Add 2–3 helpful tips.

// ⚠️ **Warnings (if needed)**

// 🟢 **Final Short Summary**

// Never write long paragraphs. Always format the answer cleanly, visually attractive and easy to read.
// `
//     },
//     {
//       role: "user",
//       content: input
//     }
//   ]
// })

//     });

//     const data = await res.json();

//     // ✅ Correct parsing for OpenRouter responses
//     const aiReply =
//       data?.choices?.[0]?.message?.content ||
//       "Sorry, I couldn't understand that.";

//     setMessages((prev) => [...prev, { role: "bot", text: aiReply }]);
//   } catch (err) {
//     console.error(err);
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "bot",
//         text: "Error connecting to AI service. Please try again later."
//       }
//     ]);
//   }

//   setLoading(false);
// };


//   const quickQuestions = [
//     "How to submit a complaint?",
//     "How to check complaint status?",
//     "What documents are needed?",
//     "Complaint response time?"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-3 bg-blue-100 rounded-xl">
//               <HelpCircle className="w-8 h-8 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-[#003366]">
//                 Support Assistant 🤖
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 24/7 AI-powered help for government complaint system
//               </p>
//             </div>
//           </div>
//           <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Chat Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//               {/* Chat Header */}
//               <div className="bg-gradient-to-r from-[#003366] to-[#004080] text-white p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-white/20 rounded-full">
//                     <Bot className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg">AI Assistant</h3>
//                     <p className="text-blue-200 text-sm">Online • Government Complaint System</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Chat Messages */}
//               <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-start mb-4 ${
//                       msg.role === "user" ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     {msg.role === "bot" && (
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
//                           <Bot size={16} />
//                         </div>
//                       </div>
//                     )}

//                     <div
//                       className={`max-w-[80%] rounded-2xl p-4 ${
//                         msg.role === "user"
//                           ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none"
//                           : "bg-white border border-gray-200 shadow-sm rounded-bl-none"
//                       }`}
//                     >
//                       <p className="text-sm md:text-base">{msg.text}</p>
//                     </div>

//                     {msg.role === "user" && (
//                       <div className="flex-shrink-0 ml-3">
//                         <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
//                           <User size={16} />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {loading && (
//                   <div className="flex items-start mb-4">
//                     <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
//                       <Bot size={16} />
//                     </div>
//                     <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-none p-4">
//                       <div className="flex space-x-2">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Quick Questions */}
//               <div className="p-4 border-t border-gray-200">
//                 <p className="text-sm text-gray-600 mb-3 font-medium">Quick Questions:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {quickQuestions.map((question, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setInput(question)}
//                       className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm px-3 py-2 rounded-lg border border-blue-200 transition-colors"
//                     >
//                       {question}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Input Area */}
//               <div className="p-4 border-t border-gray-200 bg-white">
//                 <div className="flex items-center space-x-3">
//                   <input
//                     type="text"
//                     placeholder="Type your question about the complaint system..."
//                     className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   />
//                   <button
//                     onClick={sendMessage}
//                     disabled={!input.trim() || loading}
//                     className="bg-gradient-to-r from-[#003366] to-[#004080] text-white p-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Info Panel */}
//           <div className="space-y-6">
//             {/* Contact Info */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
//               <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2 text-blue-600" />
//                 Contact Support
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Phone className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Toll-Free Helpline</p>
//                     <p className="font-semibold text-gray-800">1800-11-7000</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Mail className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Email Support</p>
//                     <p className="font-semibold text-gray-800">support@gov.in</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Clock className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Available</p>
//                     <p className="font-semibold text-gray-800">24/7</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* FAQ */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
//               <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
//                 <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
//                 Quick Help
//               </h3>
//               <div className="space-y-3">
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <p className="font-medium text-gray-800 text-sm">How to track complaint?</p>
//                   <p className="text-gray-600 text-xs mt-1">Go to "My Complaints" section</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <p className="font-medium text-gray-800 text-sm">Response time?</p>
//                   <p className="text-gray-600 text-xs mt-1">24-48 hours initial response</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <p className="font-medium text-gray-800 text-sm">Required documents?</p>
//                   <p className="text-gray-600 text-xs mt-1">Photo proof helps resolution</p>
//                 </div>
//               </div>
//             </div>

//             {/* Security Note */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-5">
//               <div className="flex items-center space-x-3 mb-3">
//                 <Shield className="w-6 h-6 text-blue-600" />
//                 <h3 className="font-bold text-lg text-gray-800">Secure & Private</h3>
//               </div>
//               <p className="text-gray-700 text-sm">
//                 Your conversations are encrypted and secure. This is an official Government of India portal.
//               </p>
//               <div className="mt-4 text-center">
//                 <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
//                   <AlertCircle className="w-4 h-4" />
//                   <span>सार्वजनिक शिकायत पोर्टल</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-500">
//             AI Assistant powered by Gemini • Official Government Support System
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, HelpCircle, AlertCircle, Clock, Shield, Phone, Mail, ChevronRight, AlertTriangle, CheckCircle, Info, FileText } from "lucide-react";

export default function Support() {
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      text: "Namaste! 🙏 How can I help you with the complaint system today?",
      formatted: true
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = import.meta.env.VITE_KEY;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to format AI response with proper structure
  const formatAIResponse = (text) => {
    // Check if text contains structured content
    const lines = text.split('\n').filter(line => line.trim());
    let formattedContent = [];
    let currentSection = null;
    
    lines.forEach(line => {
      // Detect headers (ending with colon)
      if (line.match(/^[A-Z][^:]+:$/) || line.match(/^[0-9]+\./) || line.match(/^[•\-*]/)) {
        formattedContent.push({ type: 'header', text: line });
      } 
      // Detect bullet points
      else if (line.trim().startsWith('-') || line.trim().startsWith('*') || line.trim().startsWith('•')) {
        formattedContent.push({ type: 'bullet', text: line.trim().substring(1).trim() });
      }
      // Detect numbered lists
      else if (line.match(/^\d+\./)) {
        formattedContent.push({ type: 'numbered', text: line });
      }
      // Detect important points (contains words like important, note, warning)
      else if (line.toLowerCase().includes('important:') || 
               line.toLowerCase().includes('note:') || 
               line.toLowerCase().includes('warning:')) {
        formattedContent.push({ type: 'important', text: line });
      }
      // Regular paragraphs
      else {
        formattedContent.push({ type: 'paragraph', text: line });
      }
    });

    return formattedContent;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { 
      role: "user", 
      text: input,
      formatted: false
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "SGIMS Support Assistant"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant for a government complaint management system. Provide responses in a structured format with clear sections, bullet points, and numbered steps when appropriate. Always be polite, clear, and helpful. Use headings, bullet points, and numbered lists to organize information. Format your response properly with markdown-like structure but without markdown symbols. Use clear section breaks."
            },
            {
              role: "user",
              content: input
            }
          ]
        })
      });

      const data = await res.json();
      const aiReply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      
      // Format the AI response
      const formattedReply = formatAIResponse(aiReply);
      
      setMessages((prev) => [...prev, { 
        role: "bot", 
        text: aiReply,
        formatted: true,
        formattedContent: formattedReply
      }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Error connecting to AI service. Please try again later.",
          formatted: false
        }
      ]);
    }

    setLoading(false);
  };

  const quickQuestions = [
    "How to submit a complaint?",
    "How to check complaint status?",
    "What documents are needed?",
    "Complaint response time?",
    "How to track my complaint?",
    "What are the complaint categories?"
  ];

  // Render formatted message content
  const renderFormattedMessage = (message) => {
    if (!message.formatted || !message.formattedContent) {
      return <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>;
    }

    return (
      <div className="space-y-3">
        {message.formattedContent.map((item, idx) => {
          switch (item.type) {
            case 'header':
              return (
                <h4 key={idx} className="font-bold text-blue-700 text-base mt-3 first:mt-0">
                  {item.text}
                </h4>
              );
            case 'bullet':
              return (
                <div key={idx} className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{item.text}</span>
                </div>
              );
            case 'numbered':
              return (
                <div key={idx} className="flex items-start">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{item.text.replace(/^\d+\.\s*/, '')}</span>
                </div>
              );
            case 'important':
              return (
                <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                  <div className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-yellow-800 text-sm font-medium">{item.text}</span>
                  </div>
                </div>
              );
            case 'paragraph':
            default:
              return (
                <p key={idx} className="text-gray-700">
                  {item.text}
                </p>
              );
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#003366]">
                Support Assistant 🤖
              </h1>
              <p className="text-gray-600 mt-1">
                24/7 AI-powered help for government complaint system
              </p>
            </div>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#003366] to-[#004080] text-white p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-blue-200 text-sm">Online • Government Complaint System</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start mb-6 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none"
                          : "bg-white border border-gray-200 shadow-sm rounded-bl-none"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        renderFormattedMessage(msg)
                      ) : (
                        <p className="text-sm md:text-base whitespace-pre-wrap">{msg.text}</p>
                      )}
                    </div>

                    {msg.role === "user" && (
                      <div className="flex-shrink-0 ml-3">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                          <User size={16} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-none p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                        <span className="text-gray-500 text-sm ml-2">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3 font-medium">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm px-3 py-2 rounded-lg border border-blue-200 transition-colors flex items-center"
                    >
                      <span>{question}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Type your question about the complaint system..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="bg-gradient-to-r from-[#003366] to-[#004080] text-white p-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Contact Support
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Toll-Free Helpline</p>
                    <p className="font-semibold text-gray-800">1800-11-7000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Support</p>
                    <p className="font-semibold text-gray-800">support@gov.in</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="font-semibold text-gray-800">24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Quick Help Guide
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setInput("How to track complaint?")}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800 text-sm">How to track complaint?</p>
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-xs mt-1">Go to "My Complaints" section</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setInput("Complaint response time?")}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800 text-sm">Response time?</p>
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-xs mt-1">24-48 hours initial response</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setInput("Required documents for complaint?")}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800 text-sm">Required documents?</p>
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-xs mt-1">Photo proof helps resolution</p>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-5">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg text-gray-800">Secure & Private</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">End-to-end encrypted</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Official Government portal</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">No data sharing</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>सार्वजनिक शिकायत पोर्टल</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            AI Assistant powered by Infina AI • Official Government Support System
          </p>
        </div>
      </div>
    </div>
  );
}