import React from "react";
import { Check, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { MagneticButton } from "../ui/MagneticButton";
import { useNavigate } from "react-router-dom";

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

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function Pricing() {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const plans = [
    {
      name: "Starter",
      price: "2,500",
      period: "month",
      description: "Perfect for growing businesses ready to automate",
      features: [
        "AI Phone Agent (100 calls/month)",
        "Lead Capture & Scoring",
        "Basic CRM Integration",
        "Email Automation",
        "Analytics Dashboard",
        "Email Support"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "5,000",
      period: "month",
      description: "Comprehensive automation for established businesses",
      features: [
        "AI Phone Agent (500 calls/month)",
        "Advanced Lead Qualification",
        "Custom CRM Configuration",
        "SMS & Email Automation",
        "Advanced Analytics",
        "Priority Support",
        "Custom Integrations",
        "Monthly Strategy Calls"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "month",
      description: "White-glove service for enterprise operations",
      features: [
        "Unlimited AI Agent Calls",
        "Custom AI Training",
        "Full CRM Customization",
        "Multi-channel Automation",
        "Predictive Analytics",
        "Dedicated Account Manager",
        "24/7 Premium Support",
        "Custom Development"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionTitle
          title="Investment Plans"
          subtitle="Choose the perfect plan to transform your business operations"
          className="mb-20"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
              variants={scaleIn}
              custom={index * 0.1}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 rounded-full text-white text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`glass-effect p-8 rounded-3xl premium-shadow h-full group-hover:scale-105 transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-blue-500/50 premium-glow' 
                  : 'border border-white/10'
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">
                    {plan.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-white/60 text-lg">$</span>
                    <span className="text-4xl font-bold text-white font-display">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-white/60">/{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <MagneticButton
                  variant={plan.popular ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                  onClick={() => navigate('/contact')}
                >
                  {plan.cta}
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money-back guarantee */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center space-x-3 glass-effect px-6 py-3 rounded-full">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-white/80 text-sm">
              30-day money-back guarantee • No setup fees • Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}