import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Pill, MessageSquare, ArrowLeft, Skull } from "lucide-react";

// ------------------------------
// Tiny hash router
// ------------------------------
function useHashRoute() {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' && window.location.hash ? window.location.hash.slice(1) : "/"));
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const push = (path) => {
    if (typeof window !== 'undefined') window.location.hash = path;
  };
  return { route, push };
}

// ------------------------------
// Layout helpers
// ------------------------------
const Shell = ({ children }) => (
  <div className="min-h-screen bg-[rgb(229,203,165)] text-stone-900 selection:bg-amber-300">
    <div className="fixed inset-0 pointer-events-none opacity-30" style={{
      backgroundImage:
        "radial-gradient(transparent 0 1px, rgba(0,0,0,.15) 1px), radial-gradient(transparent 0 1px, rgba(0,0,0,.08) 1px)",
      backgroundSize: "4px 4px, 2px 2px",
      backgroundPosition: "0 0, 1px 1px",
    }} />
    {children}
  </div>
);

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const BrandWord = ({ children }) => (
  <span className="inline-block rounded-xl bg-[rgb(61,105,110)] px-3 py-1 font-extrabold tracking-wider text-[rgb(247,232,206)] shadow-[inset_0_-6px_0_rgba(0,0,0,.12)]">{children}</span>
);

// ------------------------------
// Header
// ------------------------------
const Header = ({ push }) => (
  <header className="sticky top-0 z-40 border-b border-stone-700/20 bg-[rgb(201,166,117)]/90 backdrop-blur supports-[backdrop-filter]:bg-[rgb(201,166,117)]/70">
    <Container>
      <div className="flex items-center gap-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[rgb(61,105,110)] grid place-items-center text-[rgb(247,232,206)] shadow">
            <Pill className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-xl font-black tracking-wide">Droo's <span className="text-[rgb(61,105,110)]">Party</span> Prescriptions</div>
            <div className="text-xs opacity-80">Barely legal. Definitely not safe. Absolutely worth it.</div>
          </div>
        </div>
        <nav className="ml-auto flex items-center gap-2">
          <Button variant="ghost" className="font-bold" onClick={() => push("/")}>Home</Button>
          <Button variant="ghost" className="font-bold" onClick={() => push("/about")}>About</Button>
          <Button variant="ghost" className="font-bold" onClick={() => push("/disclaimer")}>Disclaimer</Button>
          <Button variant="ghost" className="font-bold" onClick={() => push("/doctor")}>Talk to a Doctor</Button>
          <Button className="font-extrabold bg-[rgb(61,105,110)] text-[rgb(247,232,206)] hover:bg-[rgb(50,90,95)]" onClick={() => push("/support")}>Support</Button>
        </nav>
      </div>
    </Container>
  </header>
);

// ------------------------------
// Retro UI pieces
// ------------------------------
const RetroCard = ({ title, subtitle, img, children }) => (
  <Card className="overflow-hidden rounded-2xl border-[3px] border-stone-900/30 shadow-[0_10px_30px_rgba(0,0,0,.25)]">
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="md:col-span-1 bg-[rgb(61,105,110)]/10 p-6 flex items-center justify-center">
        <img src={img} alt={title} className="h-48 object-contain drop-shadow" />
      </div>
      <CardContent className="md:col-span-2 p-6">
        <div className="mb-2 text-2xl font-black tracking-wide">{title}</div>
        <div className="mb-4 text-sm opacity-80">{subtitle}</div>
        <div className="text-sm leading-relaxed">{children}</div>
      </CardContent>
    </div>
  </Card>
);

const funFacts = [
  "Clinically tested on idiots who thought Four Loko was a pre-workout.",
  "Made in a facility that also handles cocaine, regret, and Hot Pockets.",
  "Now with 0% daily value of self-respect.",
  "If effects last longer than 4 hours: call your ex and ruin their night.",
  "Not a scam. Just organized chaos in a bottle.",
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const SideEffectRoller = () => {
  const effects = useMemo(() => [
    "Spontaneous dry humping of furniture",
    "Accidentally joining a pyramid scheme",
    "Uncontrollable urge to text your dealer happy birthday",
    "Believing traffic cones are sexier than they are",
    "Aggressive karaoke even when sober",
    "Flashbacks to that time you shit yourself at prom",
    "Buying NFTs of pigeons",
    "Inventing new swear words that make sailors blush",
    "Believing you're the CEO of hamsters",
    "Crying while eating Taco Bell at 3AM",
  ], []);
  const [pick, setPick] = useState(random(effects));
  return (
    <div className="rounded-2xl border border-stone-900/20 bg-white/50 p-4 shadow">
      <div className="mb-2 text-sm font-bold tracking-wide">Random Side Effect</div>
      <div className="text-lg font-black">{pick}</div>
      <Button className="mt-3" onClick={() => setPick(random(effects))}>Roll Again</Button>
    </div>
  );
};

// ------------------------------
// Reviews slideshow (manual + dots)
// ------------------------------
const reviewsData = [
  { name: "Kyng B.", text: "Took two pills, woke up in a zoo cage spooning a gorilla. 11/10 would risk hepatitis again." },
  { name: "Jaydenn M.", text: "I popped one before my exam, wrote a love letter to my calculator, and still somehow passed with flying colors." },
  { name: "Noah M.", text: "Drank half a bottle, ended up running a marathon I never signed up for. Still waiting on my medal." },
  { name: "Burna", text: "Lit up, blacked out, woke up as the new manager of a Waffle House. Haven’t clocked out since." },
  { name: "CHAD", text: "Took three, benched a car, kissed my homie on the lips, then bought Bitcoin at the peak. Word to my Timbs B..." },
  { name: "Vito Soprano", text: "Forget about it — this shit hits harder than my uncle after 5 whiskeys." },
  { name: "Tank", text: "Snorted it, injected it, rubbed it on my gums. Felt like the Hulk if the Hulk also cried in the shower." },
];

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const go = (i) => setIndex((i + reviewsData.length) % reviewsData.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-black mb-4">Customer Reviews (from our highly unstable clientele)</h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="p-6 rounded-2xl border border-stone-900/20 bg-white/70 shadow max-w-2xl mx-auto"
          >
            <p className="text-sm"><strong>{reviewsData[index].name}</strong>: {reviewsData[index].text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={prev}>Prev</Button>
          <Button onClick={next}>Next</Button>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {reviewsData.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => go(i)}
              className={`h-3 w-3 rounded-full ${i === index ? 'bg-[rgb(61,105,110)]' : 'bg-stone-400/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ------------------------------
// Pages - Home
// ------------------------------
const Home = ({ push }) => (
  <main>
    <section className="border-b border-stone-900/10 bg-[rgb(201,166,117)]/40 py-10">
      <Container>
        <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr] items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="mb-3 text-4xl sm:text-5xl font-black leading-tight">
              Welcome to <BrandWord>DROO'S</BrandWord> <span className="whitespace-nowrap">Party Prescriptions</span>
            </motion.h1>
            <p className="max-w-prose text-stone-800">
              The sketchiest pharmacy in Los Santos. Our pills slap harder than child support payments, our powders hit faster than regret, and our customers usually survive to leave a review.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => push("/doctor")} className="gap-2 bg-[rgb(61,105,110)] text-[rgb(247,232,206)] hover:bg-[rgb(50,90,95)]"><Bot className="h-4 w-4"/> Talk to "Doctor" Droo</Button>
              <Button onClick={() => push("/disclaimer")} variant="outline" className="gap-2"><Skull className="h-4 w-4"/> Read the Disclaimer</Button>
            </div>
            <p className="mt-4 text-sm italic opacity-80">Fun fact: {random(funFacts)}</p>
          </div>
          <SideEffectRoller />
        </div>
      </Container>
    </section>

    <section className="py-10">
      <Container>
        <div className="mb-6 text-2xl font-black tracking-wide">Featured Prescriptions</div>
        <div className="grid gap-6">
          <RetroCard
            title="Droo's Daytrip"
            subtitle="A high-flying fuckfest."
            img="/assets/drdt.png"
          >
            Take a stroll through the clouds without leaving the couch. Side effects may include drunk-texting your mom, fighting pigeons, and thinking you invented WiFi after two sips of Red Bull.
          </RetroCard>

          <RetroCard
            title="Molly Madness"
            subtitle="Strictly for blackouts and bad ideas."
            img="/assets/drmm.png"
          >
            Turn every playlist into a brain-melting light show. May cause you to marry a stripper, confess your deepest secrets to a lamp post, or cry while hugging your shoes.
          </RetroCard>

          <RetroCard
            title="Party Favor"
            subtitle="Grandpa's cough syrup but on steroids."
            img="/assets/drpf.png"
          >
            Instant friendship in a bottle. Warning: may also get you arrested, divorced, or both at the same time.
          </RetroCard>

          <RetroCard
            title="Prescriptions (Totally Real)"
            subtitle="Doctor on the label, felon in real life."
            img="/assets/drpre.png"
          >
            Collect them all like Pokémon for degenerates. Do not attempt taxes while using.
          </RetroCard>
        </div>
        <Reviews />
      </Container>
    </section>

    <footer className="mt-10 border-t border-stone-900/10 bg-[rgb(201,166,117)]/40">
      <Container>
        <div className="flex flex-col sm:flex-row items-center gap-3 py-6 text-sm opacity-80">
          <div>© {new Date().getFullYear()} Droo's Party Prescriptions — Your liver hates us, but your heart loves us.</div>
          <div className="sm:ml-auto">Not affiliated with anyone respectable. Especially not <strong>ZYN$</strong>. Fuck you for even asking.</div>
        </div>
      </Container>
    </footer>
  </main>
);

// ------------------------------
// Support Page
// ------------------------------
const Support = () => (
  <main className="py-16">
    <Container>
      <h1 className="text-3xl font-black mb-4">Support</h1>
      <p className="text-2xl font-extrabold">GO FUCK YOURSELF</p>
    </Container>
  </main>
);

// ------------------------------
// About Page
// ------------------------------
const About = () => (
  <main className="py-16">
    <Container>
      <h1 className="text-3xl font-black mb-4">About Droo</h1>
      <p>
        The story of Droo is like an urban legend wrapped in a fever dream. Some say he was a pharmacist who lost his license in a poker game. Others swear he just appeared one day outside a rave with a suitcase full of pills and a smile that could sell out Madison Square Garden. Nobody really knows where he came from, or why every prescription bottle has his name on it. All we know is: the less you ask, the safer you probably are.
      </p>
      <p className="mt-4">
        Rumors swirl: a childhood in a shipping container, a past life as a roadie for a band you've never heard of, a brief apprenticeship with a disgraced chemist, and a suspiciously detailed knowledge of nightclub coat checks. But every lead goes cold. Droo likes it that way. Mystery is good marketing.
      </p>
      <p className="mt-4">
        If you ever meet him, he will probably wink, ask for exact change, and sell you something that will make you forget how to be boring.
      </p>
    </Container>
  </main>
);

// ------------------------------
// Disclaimer Page (long & ridiculous)
// ------------------------------
const Disclaimer = () => (
  <main className="py-16">
    <Container>
      <h1 className="text-3xl font-black mb-4">Disclaimer</h1>
      <div className="prose prose-stone max-w-none whitespace-pre-line">
{`THIS IS A VERY SERIOUS DISCLAIMER (but also not).

By reading, purchasing, or even thinking about purchasing anything from Droo's Party Prescriptions you agree to the following legally flimsy statements:

1) These products are sold "as is" — meaning they exist, look weird, and carry no promises. We definitely did not ask a pharmacist.

2) Side effects may include but are not limited to: spontaneous dance-offs, unexpected tattoos shaped like things you regret, mistaken identity at family reunions, and a sudden career in interpretive juggling.

3) If you experience any prolonged side effect (defined as lasting longer than the runtime of a bad sitcom), immediately consult a licensed professional, a barista, or that one uncle who still has home remedies involving mayonnaise.

4) We are not responsible for any psychological revelations, time travel experiences, or sudden clairvoyance that may cause you to foreclose on your own emotions.

5) If you take more than instructed, do not call us. We will be busy counting our profits and pretending the label said otherwise.

6) This product may cause you to gain the ability to recite the lyrics to every pop song from 2004 to 2012. This is permanent and non-refundable.

7) Any resemblance to an actual medical product, legal advice, or good life choices is purely coincidental.

8) If a family member looks at you funny after using this product, blame the lighting.

9) We have never met your parents. Don't put our name on their Christmas card list.

10) If you wake up in a new city with a slightly different name, please accept this as a life upgrade.

The long and short of it: use at your own risk. If you survive, congratulations — you have excellent stories. If not, please let us know how the story ends so we can sell the narrative.

By scrolling past this sentence you waive the right to be boring. Enjoy responsibly (or don't).`}
      </div>
    </Container>
  </main>
);

// ------------------------------
// Dr. Droo Chatbot (terrible advice)
// ------------------------------
const badTakes = [
  "Have you tried drugs? No shit, more drugs.",
  "If it burns when you pee, just piss on someone you hate.",
  "Two wrongs don’t make a right, but three shots of tequila do.",
  "Sleep is for cowards, snort caffeine instead.",
  "If it hurts, that means it’s working. Probably.",
  "Your body isn’t failing, it’s just rage-quitting life.",
  "An apple a day keeps me employed as your plug.",
  "Hydrate or die, bitch.",
  "Pop another, future you can deal with it.",
  "Exercise? Just run from your problems.",
  "Therapy is expensive, but yelling at pigeons is free.",
  "Pain is weakness leaving the body — or maybe a lawsuit waiting to happen."
];

const DoctorChat = () => {
  const [messages, setMessages] = useState([
    { from: "dr", text: "Yo, I'm Dr. Droo. What’s wrong with you now?" },
    { from: "dr", text: "Tip: if it glows, it’s probably medicinal. Might be fine." },
  ]);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);

  useEffect(() => {
    try { boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight }); } catch (e) { /* ignore */ }
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "you", text: input.trim() };
    const drMsg = { from: "dr", text: badTakes[Math.floor(Math.random() * badTakes.length)] };
    setMessages((m) => [...m, userMsg, drMsg]);
    setInput("");
  };

  return (
    <main className="py-16">
      <Container>
        <h1 className="text-3xl font-black mb-4">Talk to Dr. Droo</h1>
        <Card className="rounded-2xl border-[3px] border-stone-900/30">
          <CardContent className="p-0">
            <div ref={boxRef} className="h-[420px] overflow-y-auto bg-[rgb(61,105,110)]/10 p-4">
              {messages.map((m, i) => (
                <div key={i} className={`mb-3 flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow ${m.from === 'you' ? 'bg-[rgb(61,105,110)] text-[rgb(247,232,206)]' : 'bg-white'}`}>
                    <span className="font-bold mr-2">{m.from === 'dr' ? 'Dr. Droo' : 'You'}:</span>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-stone-900/10 p-3">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your *totally real* symptoms…" onKeyDown={(e) => e.key === 'Enter' && send()} />
              <Button onClick={send} className="gap-2"><MessageSquare className="h-4 w-4"/> Send</Button>
            </div>
          </CardContent>
        </Card>
        <p className="mt-3 text-xs opacity-70">Doctor Droo provides intentionally bad, comedic advice. Do not use this for real medical emergencies — for that, see an actual clinician or emergency services.</p>
      </Container>
    </main>
  );
};

// ------------------------------
// App Export
// ------------------------------
export default function App() {
  const { route, push } = useHashRoute();

  return (
    <Shell>
      <Header push={push} />
      {route === "/" && <Home push={push} />}
      {route === "/about" && <About />}
      {route === "/disclaimer" && <Disclaimer />}
      {route === "/doctor" && <DoctorChat />}
      {route === "/support" && <Support />}
    </Shell>
  );
}
