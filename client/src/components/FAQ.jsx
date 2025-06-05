import React, { useContext, useState } from "react";
import { Context } from "@/context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What makes your platform unique?",
    answer:
      "Our platform combines expert-led courses with interactive tests and personalized progress tracking, ensuring an immersive learning experience.",
  },
  {
    question: "Are your courses beginner-friendly?",
    answer:
      "Absolutely! We offer courses for all levels, and each includes foundational modules to help beginners get started with confidence.",
  },
  {
    question: "How can I track my learning progress?",
    answer:
      "Each course comes with a personalized dashboard where you can monitor your test scores, course completion, and suggested next steps.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes! Upon successful course completion, learners receive a verified certificate to showcase their achievement.",
  },
];

const FaqSection = () => {
  const { background } = useContext(Context);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section
      className={`py-20 px-6 md:px-24 transition-all duration-300 ${
        background ? "bg-gray-100" : "bg-slate-950"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            background ? "text-gray-900" : "text-white"
          }`}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 shadow-md transition-all duration-300 ${
                background ? "bg-white text-gray-800" : "bg-gray-900 text-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full focus:outline-none"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-[#2CA4AB]" />
                ) : (
                  <FaChevronDown className="text-[#2CA4AB]" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-4 text-sm md:text-base text-justify leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
