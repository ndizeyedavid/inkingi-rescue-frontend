import { ChevronLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import promptAi from "../robot/gemini";
import { motion, AnimatePresence } from "framer-motion";

function Ai() {
     const [messages, setMessages] = useState([]);
     const [loading, setLoading] = useState(false);
     const messagesEndRef = useRef(null);

     const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     useEffect(() => {
          scrollToBottom();
     }, [messages]);

     const { register, handleSubmit, reset, setFocus } = useForm();

     async function sendMessage(data) {
          try {
               setLoading(true);
               setMessages(prev => [...prev, { role: 'user', content: data.message }]);
               const contents = [
                    {
                         role: "user",
                         parts: [
                              {
                                   text: data.message,
                              },
                         ],
                    },
               ]
               const response = await promptAi(contents)

               setMessages(prev => [...prev, { role: 'assistant', content: response }]);
          } catch (err) {
               toast.error(err.message);
          } finally {
               reset();
               setLoading(false);
               setFocus('message');
          }
     }

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-base-200'>
                    <div className='flex gap-3'>
                         <Link to="/" className='bg-base-100 p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">INKINGI Ai</h3>
                    </div>
               </div>

               <div className="flex flex-col h-[calc(100vh-95px)]">
                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                         <AnimatePresence>
                              {messages.map((message, index) => (
                                   <motion.div
                                        key={index}
                                        initial={{
                                             opacity: 0,
                                             y: 20,
                                             scale: 0.8
                                        }}
                                        animate={{
                                             opacity: 1,
                                             y: 0,
                                             scale: 1
                                        }}
                                        transition={{
                                             duration: 0.3,
                                             type: "spring",
                                             stiffness: 260,
                                             damping: 20
                                        }}
                                        className={`chat ${message.role === 'user' ? 'chat-end' : 'chat-start'}`}
                                   >
                                        <motion.div
                                             initial={{ scale: 0.5 }}
                                             animate={{ scale: 1 }}
                                             transition={{ duration: 0.2 }}
                                             className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}
                                        >
                                             {message.content}
                                        </motion.div>
                                   </motion.div>
                              ))}

                              {loading && (<div className="chat chat-start"><div className="chat-bubble chat-bubble-secondary" ><span className="loading loading-spinner"></span></div></div>)}
                         </AnimatePresence>
                         <div ref={messagesEndRef} />
                    </div>

                    {/* Input form */}
                    <form onSubmit={handleSubmit(sendMessage)} className="p-4 bg-base-200">
                         <div className="join w-full">
                              <input
                                   type="text"
                                   placeholder="Type your message..."
                                   className="input input-bordered join-item w-full"
                                   disabled={loading}
                                   {...register("message")}
                              />
                              <motion.button
                                   type="submit"
                                   className="btn join-item btn-primary"
                                   whileTap={{ scale: 0.95 }}
                                   whileHover={{ scale: 1.05 }}
                              >
                                   {loading ? <span className="loading loading-spinner"></span> : <Send size={20} />}
                              </motion.button>
                         </div>
                    </form>
               </div>
          </>
     )
}

export default Ai
