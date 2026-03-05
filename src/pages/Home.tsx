import { Link } from 'react-router-dom'
import { CheckCircle, Lock, Zap, Shield, Users, Globe } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Lock size={32} className="text-accent" />,
      title: 'Secure Verification',
      description: 'Advanced encryption ensures your certificate data is protected'
    },
    {
      icon: <Zap size={32} className="text-accent" />,
      title: 'Instant Results',
      description: 'Get verification results in seconds, not days'
    },
    {
      icon: <Shield size={32} className="text-accent" />,
      title: 'Tamper-Proof',
      description: 'Blockchain technology prevents certificate forgery'
    },
    {
      icon: <Users size={32} className="text-accent" />,
      title: 'Wide Acceptance',
      description: 'Recognized by educational institutions and employers'
    },
    {
      icon: <Globe size={32} className="text-accent" />,
      title: 'Global Coverage',
      description: 'Verify certificates from institutions worldwide'
    },
    {
      icon: <CheckCircle size={32} className="text-accent" />,
      title: 'Easy Integration',
      description: 'Simple API for seamless integration with your systems'
    }
  ]

  const steps = [
    { num: 1, title: 'Enter Certificate ID', desc: 'Provide the certificate number' },
    { num: 2, title: 'Submit Details', desc: 'Add recipient information' },
    { num: 3, title: 'Get Verified', desc: 'Instant authentication result' }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-purple-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Verify Certificates with Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto">
            Fast, secure, and reliable certificate verification system trusted by institutions worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verify" className="btn-primary bg-accent hover:bg-yellow-600 text-black">
              Verify Certificate
            </Link>
            <Link to="/register" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Certified?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/verify" className="btn-primary">
              Start Verification Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Verify?</h2>
          <p className="text-lg mb-8 text-gray-100">Join thousands of institutions and individuals using Certified</p>
          <Link to="/register" className="btn-secondary bg-accent hover:bg-yellow-600 text-black">
            Create Account
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-accent mb-2">50K+</h3>
              <p className="text-gray-300">Certificates Verified</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-accent mb-2">500+</h3>
              <p className="text-gray-300">Institutions</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-accent mb-2">100K+</h3>
              <p className="text-gray-300">Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-accent mb-2">99.9%</h3>
              <p className="text-gray-300">Uptime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
