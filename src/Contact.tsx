import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Github, Linkedin, Twitter, Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";

// Même logique que les autres pages : fond violet foncé en arrière-plan de
// page (cohérence du site), carte claire pour le formulaire (cohérence avec
// la maquette "Get In Touch").
const colors = {
  canvas: "#1b1130",
  blobOrange: "#ff7a3d",
  blobViolet: "#7c4dff",
  card: "#fffaf3",
  cardSoft: "#fbf5ec",
  ink: "#1e1810",
  inkSoft: "#6f6355",
  inkFaint: "#a89c8b",
  textLight: "#f6f1ea",
  textMuted: "#bdb0d9",
  textFaint: "#8a7dab",
  lineLight: "rgba(246,241,234,0.16)",
  accent: "#ff6a2b",
  accentDeep: "#e04f16",
  accentSoft: "#ffe3cd",
  line: "#ece2d3",
};

const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ------------------------------------------------------------------
// CONFIGURATION EMAILJS
// À remplacer par tes propres identifiants, récupérables sur
// https://dashboard.emailjs.com/ après avoir créé :
//   1. un "Email Service" (ex: connecté à ton Gmail)      -> SERVICE_ID
//   2. un "Email Template" (le corps de l'email reçu)     -> TEMPLATE_ID
//   3. ta clé publique (Account > General > Public Key)   -> PUBLIC_KEY
//
// Le template EmailJS doit contenir des variables correspondant aux clés
// envoyées dans templateParams ci-dessous, ex: {{first_name}}, {{email}}, etc.
// ------------------------------------------------------------------
const EMAILJS_SERVICE_ID = "service_z3ka5ev";
const EMAILJS_TEMPLATE_ID = "template_hpb7i3a";
const EMAILJS_PUBLIC_KEY = "hdDvuQnC-e_CbEPbq";

// Style commun réutilisé pour tous les champs du formulaire
const inputStyle = {
  background: "#ffffff",
  border: `1.5px solid ${colors.line}`,
  color: colors.ink,
  fontFamily: fonts.body,
};

export default function Contact() {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }>({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    // Les clés ici (first_name, last_name, email, phone, message) doivent
    // correspondre exactement aux variables {{...}} utilisées dans ton
    // template EmailJS.
    const templateParams = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone || "Non renseigné",
      message: form.message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
    } catch (err) {
      console.error("Erreur d'envoi EmailJS :", err);
      setError("L'envoi a échoué. Réessaie dans quelques instants ou écris-moi directement par email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{ background: colors.canvas }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>

      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", top: "-18vw", left: "-12vw", background: colors.blobOrange, filter: "blur(100px)", opacity: 0.4 }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", bottom: "-18vw", right: "-12vw", background: colors.blobViolet, filter: "blur(100px)", opacity: 0.35 }}
      />

      <div className="relative w-full max-w-6xl flex flex-col gap-8">
        {/* Carte claire, comme le bloc "Get In Touch" de la maquette */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl px-6 md:px-11 py-10 md:py-14"
          style={{ background: colors.card, fontFamily: fonts.body }}
        >
          <div className="text-center mb-10 max-w-md mx-auto">
            <h2
              className="font-bold leading-[1.1] mb-3"
              style={{ fontFamily: fonts.display, color: colors.ink, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
            >
              Entrons en <span style={{ color: colors.accent, fontStyle: "italic" }}>Contact</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: colors.inkSoft }}>
              Discutons de votre projet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            {/* left: photo + coordonnées */}
            <div className="relative flex justify-center lg:justify-start">
              <div
                className="absolute rounded-[2rem] rotate-6"
                style={{ width: "70%", height: "80%", background: colors.accentSoft }}
              />
              <div className="relative w-[240px] md:w-[320px] h-[280px] md:h-[340px] rounded-[2rem] overflow-hidden shadow-xl">
                <img
                  src="/images/image4.png"
                  alt="Contactez Ouali"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bulle "message" flottante, comme l'icône enveloppe de la maquette */}
              <div
                className="absolute top-2 -right-1 md:right-3 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: colors.ink, boxShadow: "0 14px 30px -12px rgba(0,0,0,0.4)" }}
              >
                <Mail size={18} color={colors.card} />
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: colors.accent }}
                >
                  1
                </span>
              </div>

              {/* Coordonnées directes, en complément du formulaire */}
              <div className="hidden lg:flex flex-col gap-3 absolute bottom-2 left-2 text-xs text-white " >
                <div className="flex items-center gap-2"><Mail size={13} />bahabdallah057@gmail.com</div>
                <div className="flex items-center gap-2"><Phone size={13} /> +221 77 912 92 54</div>
                <div className="flex items-center gap-2"><MapPin size={13} /> Dakar, Sénégal</div>
              </div>
            </div>

            {/* right: formulaire */}
            <div>
              {sent ? (
                // État de confirmation après envoi réussi via EmailJS
                <div
                  className="flex flex-col items-center justify-center text-center gap-3 rounded-2xl py-14 px-6"
                  style={{ background: colors.cardSoft, border: `1px solid ${colors.line}` }}
                >
                  <CheckCircle2 size={32} color={colors.accentDeep} />
                  <p className="font-semibold" style={{ color: colors.ink, fontFamily: fonts.display }}>
                    Message envoyé !
                  </p>
                  <p className="text-sm" style={{ color: colors.inkSoft }}>
                    Merci, je reviens vers vous rapidement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Prénom"
                    required
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:border-current"
                    style={{ ...inputStyle, gridColumn: "span 1" }}
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    required
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="Adresse e-mail"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors sm:col-span-2"
                    style={inputStyle}
                  />
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors sm:col-span-2"
                    style={inputStyle}
                  />
                  <textarea
                    placeholder="Votre message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none sm:col-span-2"
                    style={inputStyle}
                  />

                  {error && (
                    <p className="sm:col-span-2 text-sm" style={{ color: colors.accentDeep }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="sm:col-span-2 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-full px-6 py-3.5 transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                    style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDeep})`, boxShadow: `0 10px 24px -8px ${colors.accent}aa` }}
                  >
                    {sending ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Pied de page léger, posé directement sur le fond violet foncé */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pb-2 text-xs"
          style={{ color: colors.textFaint, fontFamily: fonts.mono }}
        >
          <span style={{ color: colors.textMuted }}>Développeur Full-Stack </span>

          <div className="flex items-center gap-3">
            {[
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "Twitter" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ border: `1px solid ${colors.lineLight}`, color: colors.textMuted }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>

          <span>© {new Date().getFullYear()} MoodDev.</span>
        </div>
      </div>
    </div>
  );
}