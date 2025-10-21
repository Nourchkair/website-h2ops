import React from "react";
import { Star, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export function Reviews() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const reviews = [
    {
      name: "Michael Rodriguez",
      company: "Rodriguez Construction",
      role: "CEO",
      rating: 5,
      review: "H2Ops transformed our lead capture completely. We went from missing 40% of calls to capturing every single lead. Our revenue increased by 250% in just 3 months.",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Sarah Chen",
      company: "Elite Realty Group",
      role: "Managing Partner",
      rating: 5,
      review: "The AI voice agents are incredible. They qualify leads better than our human staff and work 24/7. Our conversion rate doubled and we're closing more deals than ever.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "David Thompson",
      company: "Thompson Roofing",
      role: "Owner",
      rating: 5,
      review: "Best investment we've made. The automation handles everything - lead capture, qualification, follow-ups. We can focus on what we do best while the system generates qualified leads.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Lisa Martinez",
      company: "Premier Home Solutions",
      role: "Operations Director",
      rating: 5,
      review: "The ROI is incredible. We're capturing leads we never knew existed and the automated follow-up system ensures nothing falls through the cracks. Game changer for our business.",
      image: "https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionTitle
          title="Client Success Stories"
          subtitle="Real results from businesses that chose premium automation"
          className="mb-20"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              className="glass-effect p-8 rounded-3xl premium-shadow group hover:scale-105 transition-all duration-300"
              variants={fadeInUp}
              custom={index * 0.1}
            >
              {/* Quote Icon */}
              <div className="text-blue-400 mb-6">
                <Quote className="w-8 h-8" />
              </div>

              {/* Review Text */}
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                "{review.review}"
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-0.5"
                >
                  <div 
                    className="w-full h-full rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${review.image})` }}
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">{review.name}</div>
                  <div className="text-white/60 text-sm">{review.role}</div>
                  <div className="text-blue-400 text-sm font-medium">{review.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}