import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase) return
    setError(null)

    const trimmedName = name.trim()
    const trimmedPassword = password
    if (!trimmedName || !trimmedPassword) {
      setError('Name and password are required.')
      return
    }

    if (!trimmedName.includes('@')) {
      setError('Please enter your email address in the name field.')
      return
    }

    setBusy(true)
    void (async () => {
      try {
        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({
            email: trimmedName,
            password: trimmedPassword,
          })
          if (error) throw error
          navigate('/hackathons')
        } else {
          const { error } = await supabase.auth.signUp({
            email: trimmedName,
            password: trimmedPassword,
            options: { emailRedirectTo: `${window.location.origin}/hackathons` },
          })
          if (error) throw error
          navigate('/hackathons')
        }
      } catch (err) {
        console.error(err)
        setError(
          isLogin
            ? 'Login failed. Check your credentials (and confirm your email if you just signed up).'
            : 'Sign up failed. Please try again.',
        )
      } finally {
        setBusy(false)
      }
    })()
  }

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHeroContent">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img src="/assets/aoai-logo.png" alt="AOAI Logo" className="w-16 h-16 object-contain" />
            <span className="text-4xl font-bold text-white">×</span>
            <img src="/assets/chatandbuild-logo.jpg" alt="ChatAndBuild Logo" className="w-16 h-16 object-contain rounded-lg" />
          </div>
          <h1 className="landingTitle">AOAI × ChatAndBuild Hackathon</h1>
          <p className="landingSubtitle">Submit your innovative AI-powered applications and compete for prizes</p>
          <div className="landingFeatures">
            <div className="landingFeature">
              <svg className="landingFeatureIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Easy submission process</span>
            </div>
            <div className="landingFeature">
              <svg className="landingFeatureIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Community voting</span>
            </div>
            <div className="landingFeature">
              <svg className="landingFeatureIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13.4142C20 12.8838 19.7893 12.3751 19.4142 12L14 6.58579C13.6249 6.21071 13.1162 6 12.5858 6H6C4.89543 6 4 6.89543 4 8V19C4 20.1046 4.89543 21 6 21ZM12 11H12.01V11.01H12V11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Showcase your work</span>
            </div>
          </div>
        </div>
      </div>

      <div className="landingForm">
        <section className="card">
          <h2 className="cardTitle cardTitleHero">{isLogin ? 'Log in' : 'Sign up'}</h2>
          <p className="cardHint">{isLogin ? 'Log in with your email and password.' : 'Create your account to get started.'}</p>

          {!isSupabaseConfigured ? (
            <div className="empty">Supabase is not configured on this deployment.</div>
          ) : (
            <>
              {error && (
                <div className="callout" role="status">
                  {error}
                </div>
              )}

              <form className="form" onSubmit={submit} noValidate>
                <div className="formGrid">
                  <div className="field span2">
                    <label htmlFor="landingName">
                      Email <span className="req">*</span>
                    </label>
                    <input
                      id="landingName"
                      name="landingName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={busy}
                    />
                  </div>

                  <div className="field span2">
                    <label htmlFor="landingPassword">
                      Password <span className="req">*</span>
                    </label>
                    <input
                      id="landingPassword"
                      name="landingPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      disabled={busy}
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="btn" type="submit" disabled={busy}>
                    {busy ? (isLogin ? 'Logging in…' : 'Signing up…') : isLogin ? 'Log in' : 'Sign up'}
                  </button>
                  <button className="btn btnGhost" type="button" onClick={() => setIsLogin(!isLogin)} disabled={busy}>
                    {isLogin ? 'Create account' : 'Already have an account?'}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
                <p>
                  By using this platform, you agree to our{' '}
                  <a href="#" className="text-violet-300 hover:text-violet-200 font-semibold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-violet-300 hover:text-violet-200 font-semibold">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </>
          )}
        </section>

        <footer className="landingFooter">
          <a href="https://chatandbuild.com" target="_blank" rel="noopener noreferrer" className="landingFooterBadge">
            <span className="landingFooterBadgeText">Built with</span>
            <img src="/assets/chatandbuild-logo.jpg" alt="ChatAndBuild" className="landingFooterBadgeLogo" />
            <span className="landingFooterBadgeText">ChatAndBuild</span>
          </a>
        </footer>
      </div>
    </div>
  )
}
