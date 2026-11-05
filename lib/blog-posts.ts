// Single source of truth for blog content.
// Used by the blog listing (app/blog/page.tsx), the article pages
// (app/blog/[slug]/page.tsx), and the sitemap (app/sitemap.ts).

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  /** Bare slug used for the [slug] route segment, e.g. "ai-automation-operational-drag". */
  slug: string;
  title: string;
  category: string;
  /** Human-readable date shown in the UI. */
  date: string;
  /** ISO date used for metadata and the sitemap lastModified field. */
  dateISO: string;
  readTime: string;
  excerpt: string;
  image?: string;
  featured: boolean;
  /** Full article body, rendered on the article page. */
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-automation-operational-drag",
    title: "How AI Automation Removes Hidden Operational Drag",
    category: "AI Automation",
    date: "June 2026",
    dateISO: "2026-06-04",
    readTime: "6 min read",
    excerpt:
      "Most teams do not lose time because of one big problem. They lose it through repeated checking, copying, chasing, and follow-ups that quietly slow the business down.",
    image: "/images/blog/operational-drag.png",
    featured: true,
    content: [
      {
        type: "p",
        text: "Ask most operations leaders where their time goes and they will point to a single painful project. But the real cost is rarely one big thing. It is the steady accumulation of small, repeated actions: re-checking a number, copying a value from one system to another, chasing a colleague for a status, re-sending a document that got missed. None of these is dramatic. Together, they are the single biggest tax on a growing business.",
      },
      { type: "h2", text: "What operational drag actually looks like" },
      {
        type: "p",
        text: "Operational drag is the invisible overhead between the work that creates value and the work required to keep that work moving. It hides in the gaps between tools and the handoffs between people. Because no one owns it end to end, it never shows up cleanly on a report.",
      },
      {
        type: "list",
        items: [
          "Manually reconciling two sources of data that should already agree.",
          "Re-entering the same information into a second or third system.",
          "Following up to confirm a task someone already said they finished.",
          "Rebuilding the same spreadsheet summary every week by hand.",
          "Catching exceptions only after they have caused a downstream problem.",
        ],
      },
      {
        type: "p",
        text: "Each of these feels minor in the moment. The problem is frequency. A five-minute task repeated forty times a week is not five minutes of cost. It is a part-time role you never hired for, spent on work that produces nothing new.",
      },
      { type: "h2", text: "Why adding people does not fix it" },
      {
        type: "p",
        text: "The instinct, when operations slow down, is to add headcount. But drag scales with the number of handoffs, and every new person adds handoffs. You end up coordinating the coordination. The work gets done, but the cost per unit of output quietly climbs, and the team spends more energy keeping the machine running than improving it.",
      },
      {
        type: "quote",
        text: "The goal is not to make people work faster. It is to remove the work that should never have required a person in the first place.",
      },
      { type: "h2", text: "Where AI automation changes the equation" },
      {
        type: "p",
        text: "AI automation targets the repetitive, judgment-light parts of a workflow: reading a document, extracting the right fields, matching records, flagging anything that does not line up, and routing the result to the right place. The person stays in the loop for the decisions that actually need them, and steps out of the ones that never did.",
      },
      {
        type: "p",
        text: "This is the thinking behind CargoMatiq, our freight reconciliation system. Reconciling vendor invoices against agreed rates is pure operational drag: high volume, repetitive, error-prone, and completely dependent on someone sitting down to check line by line. By automating intake, matching, and exception detection, the team stops doing the checking and starts doing the deciding.",
      },
      { type: "h2", text: "How to find your own drag" },
      {
        type: "p",
        text: "You do not need a transformation program to start. Look for work that is repeated on a schedule, follows the same steps each time, and produces a predictable output. Ask your team a simple question: what do you do every week that you wish you did not have to? The answers point directly at the drag.",
      },
      {
        type: "p",
        text: "Remove the drag and two things happen. The obvious one is time saved. The less obvious, and more valuable one, is that your best people get their attention back for the work only they can do.",
      },
    ],
  },
  {
    slug: "ai-inside-the-workflow",
    title: "Why Businesses Need AI Inside the Workflow, Not Beside It",
    category: "Operations",
    date: "June 2026",
    dateISO: "2026-06-11",
    readTime: "7 min read",
    excerpt:
      "AI creates real value when it becomes part of how work moves - capturing inputs, routing decisions, flagging exceptions, and keeping execution moving.",
    image: "/images/blog/ai-inside-workflow.png",
    featured: true,
    content: [
      {
        type: "p",
        text: "Most businesses have now tried AI. Someone pastes a report into a chat window, asks for a summary, copies the result back out, and moves on. It is useful, but it is AI sitting beside the work. The value is capped because a human still has to carry information in and carry the result out every single time.",
      },
      {
        type: "p",
        text: "The shift that actually changes operations is moving AI inside the workflow, where it runs as part of how work moves rather than as a tool you visit on the side.",
      },
      { type: "h2", text: "Beside the workflow vs. inside the workflow" },
      {
        type: "p",
        text: "AI beside the workflow is an assistant you consult. You decide when to use it, you feed it context, and you apply its output manually. AI inside the workflow is a participant. It receives inputs automatically, acts on them within defined rules, and passes the result to the next step without anyone shuttling data around.",
      },
      {
        type: "list",
        items: [
          "Beside: you forward an invoice to a chat tool and ask it to pull the totals.",
          "Inside: invoices arrive, get read, matched, and reconciled automatically, and only exceptions reach a person.",
          "Beside: you ask a model to draft a reply to a customer.",
          "Inside: incoming messages are classified, routed, and pre-drafted so the team only reviews and sends.",
        ],
      },
      { type: "h2", text: "Why the difference matters so much" },
      {
        type: "p",
        text: "The copy-paste model has a hidden ceiling: it still depends entirely on a person remembering to do it, doing it consistently, and doing it in time. The moment volume rises or the team gets busy, the assistant goes unused and the backlog returns. Embedded AI does not have that ceiling because it is triggered by the work itself, not by someone's attention.",
      },
      {
        type: "quote",
        text: "An assistant waits to be asked. A system acts the moment the work appears. That difference is the whole game.",
      },
      { type: "h2", text: "What embedded AI does inside a workflow" },
      {
        type: "p",
        text: "When AI lives inside a workflow, it tends to take on four jobs. It captures inputs as they arrive, so nothing waits in an inbox. It makes routing decisions, sending each item down the right path. It flags exceptions, surfacing only the cases that break the pattern. And it keeps execution moving, so a missing approval or a stalled step does not quietly halt the process.",
      },
      {
        type: "p",
        text: "The result is that the workflow becomes self-propelling for the common case. People are freed from being the thing that moves work from step to step, and are reserved for the judgment, exceptions, and relationships that genuinely need them.",
      },
      { type: "h2", text: "Designing for inside, not beside" },
      {
        type: "p",
        text: "Building AI into a workflow starts with mapping how work actually flows today: where it enters, every point it changes hands, and where it stalls. Those handoffs and stalls are where embedded AI earns its keep. The aim is not to automate a person's whole job, but to automate the connective tissue between steps that used to require a person simply to pass things along.",
      },
      {
        type: "p",
        text: "Done well, the team stops noticing the tool at all. The work just moves, and that is exactly the point. AI inside the workflow is not something you open. It is something the business runs on.",
      },
    ],
  },
  {
    slug: "workflow-ready-for-ai",
    title: "What Makes a Workflow Ready for AI?",
    category: "Workflow Design",
    date: "June 2026",
    dateISO: "2026-06-18",
    readTime: "5 min read",
    excerpt:
      "Before automation, the workflow needs structure. Here is how to identify where AI can create real operational impact.",
    featured: false,
    content: [
      {
        type: "p",
        text: "The question teams usually ask is whether AI can do a task. The better question is whether the workflow around that task is ready for AI. Automation does not fix a broken process. It runs the process faster, which means a messy workflow just produces mess at higher speed. Readiness is what separates automation that sticks from automation that gets quietly abandoned.",
      },
      { type: "h2", text: "The signs a workflow is ready" },
      {
        type: "p",
        text: "A workflow is a strong candidate for AI when it has structure you could explain to a new hire in a few minutes. In practice that means a few things are true.",
      },
      {
        type: "list",
        items: [
          "The inputs are predictable: the work arrives in a recognizable form, even if the exact values vary.",
          "The steps are repeatable: the same decisions get made in the same order most of the time.",
          "The rules can be stated: you can describe what 'correct' looks like and what counts as an exception.",
          "The volume is real: it happens often enough that saving time per instance adds up.",
          "The output has a home: there is a clear next step or system the result feeds into.",
        ],
      },
      {
        type: "p",
        text: "Freight reconciliation is a textbook example. Invoices arrive in known formats, the matching logic is consistent, the definition of a discrepancy is clear, and the volume is high. That combination is why it was the first workflow we built CargoMatiq around.",
      },
      { type: "h2", text: "The signs a workflow is not ready yet" },
      {
        type: "p",
        text: "Some workflows need shaping before automation makes sense. That is not a failure, it is a step. The usual blockers are an undefined process that changes depending on who runs it, decisions that rely on context no one has written down, or inputs so inconsistent that there is no stable pattern to learn.",
      },
      {
        type: "quote",
        text: "If two experienced people would handle the same case differently and both be right, the workflow needs definition before it needs automation.",
      },
      { type: "h2", text: "How to get a workflow ready" },
      {
        type: "p",
        text: "Getting ready is mostly about making the implicit explicit. Write down the steps as they actually happen, not as the policy imagines them. Name the exceptions and how each is handled. Agree on what a correct result looks like. Often this exercise alone removes friction, because it surfaces inconsistencies the team had been absorbing silently.",
      },
      {
        type: "p",
        text: "Once a workflow is structured, the decision about where AI fits becomes obvious rather than speculative. You are no longer asking whether AI could help. You are pointing at the repetitive, well-defined middle of a process and saying: that part, the machine can carry.",
      },
    ],
  },
  {
    slug: "ai-agents-vs-workflow-automation",
    title: "AI Agents vs Workflow Automation: What Should Businesses Build First?",
    category: "AI Systems",
    date: "June 2026",
    dateISO: "2026-06-25",
    readTime: "6 min read",
    excerpt:
      "Not every business problem needs an agent. Sometimes the fastest ROI comes from automating the repetitive workflow first.",
    featured: false,
    content: [
      {
        type: "p",
        text: "AI agents are the headline. They are flexible, they can reason through open-ended tasks, and they demo beautifully. So it is tempting to assume the right move is always to build an agent. In most operations, that is the wrong place to start. The fastest return usually comes from automating the repetitive workflow first and reserving agents for the problems that genuinely need them.",
      },
      { type: "h2", text: "What each one is good at" },
      {
        type: "p",
        text: "Workflow automation handles well-defined, repeatable processes: the same steps, the same rules, run reliably at volume. An AI agent handles open-ended tasks where the path is not fixed in advance and the system has to decide what to do next based on the situation.",
      },
      {
        type: "list",
        items: [
          "Workflow automation: read the invoice, match it, flag discrepancies, route exceptions. Same shape every time.",
          "AI agent: investigate why a shipment is delayed by pulling from several sources and deciding what to check next.",
          "Workflow automation: predictable, auditable, cheap to run, easy to trust.",
          "AI agent: adaptable, powerful, but harder to constrain and verify.",
        ],
      },
      { type: "h2", text: "Why workflow automation usually comes first" },
      {
        type: "p",
        text: "Most operational pain is not open-ended. It is high-volume repetition of a known process. That is exactly what workflow automation is built for, and it delivers value quickly because the behavior is predictable and the results are easy to verify. You get time back, errors drop, and the whole thing is auditable from day one.",
      },
      {
        type: "quote",
        text: "Reach for an agent when the problem has no fixed path. Reach for workflow automation when the path is clear but nobody should have to walk it by hand.",
      },
      {
        type: "p",
        text: "There is also a sequencing benefit. Automating the structured workflow forces you to clean up and define the process. That cleaner, better-instrumented process is the ideal foundation to add agent-style reasoning on top of later, for the genuinely ambiguous cases.",
      },
      { type: "h2", text: "A simple decision rule" },
      {
        type: "p",
        text: "When you are deciding what to build, ask whether the task follows the same steps most of the time. If it does, automate the workflow. If the task requires deciding what to do next based on changing context, and that decision cannot be reduced to a stable set of rules, that is where an agent earns its complexity.",
      },
      {
        type: "p",
        text: "The best operational AI is rarely one or the other. It is workflow automation carrying the predictable volume, with agents layered in for the edges. But build in that order. Capture the certain value first, then spend complexity where it is actually required.",
      },
    ],
  },
  {
    slug: "future-of-operations-ai-leverage",
    title: "The Future of Operations Is Smaller Teams With More Leverage",
    category: "Business Operations",
    date: "June 2026",
    dateISO: "2026-07-02",
    readTime: "4 min read",
    excerpt:
      "AI will not just reduce manual work. It will change how teams scale output without scaling headcount.",
    featured: false,
    content: [
      {
        type: "p",
        text: "For most of business history, growing output meant growing the team. More volume meant more people to process it. AI breaks that link. The emerging model is small teams producing the output that used to require large ones, because the repetitive work no longer scales with headcount.",
      },
      { type: "h2", text: "From more hands to more leverage" },
      {
        type: "p",
        text: "Leverage is output per person. Historically you increased it slowly, through better tools and better process. AI changes the slope. When a system handles the repetitive execution, a person's capacity is no longer capped by how many items they can personally push through. It is capped only by the judgment they bring, which is the part that was always worth paying for.",
      },
      {
        type: "quote",
        text: "The constraint stops being how many people you can hire, and becomes how clearly you can define the work you want done.",
      },
      { type: "h2", text: "What smaller, higher-leverage teams look like" },
      {
        type: "p",
        text: "These teams are not understaffed. They are differently staffed. The people who would once have spent their days on reconciliation, data entry, and status chasing are instead spending them on decisions, relationships, and improvement, while systems carry the volume underneath.",
      },
      {
        type: "list",
        items: [
          "Routine execution runs on systems, not on people's calendars.",
          "People concentrate on exceptions, judgment, and customer relationships.",
          "Output can grow sharply without a matching rise in headcount.",
          "Hiring becomes a choice about capability, not a response to volume.",
        ],
      },
      { type: "h2", text: "What this means for how you build" },
      {
        type: "p",
        text: "If output no longer has to track headcount, the priority shifts from hiring ahead of growth to building systems ahead of growth. The teams that win the next decade will be the ones that invested early in removing repetitive work, so that when demand rose, they could absorb it without a hiring scramble.",
      },
      {
        type: "p",
        text: "This is not about replacing people. It is about raising the floor of what a given team can accomplish, so that a small, capable group can operate with the reach of a much larger one. That is leverage, and it is becoming the defining advantage in operations.",
      },
    ],
  },
  {
    slug: "spreadsheets-to-systems",
    title: "From Spreadsheets to Systems: The Next Step for Growing Businesses",
    category: "Digital Operations",
    date: "June 2026",
    dateISO: "2026-07-09",
    readTime: "5 min read",
    excerpt:
      "Spreadsheets work until they become the business process. AI systems help teams move from manual coordination to reliable execution.",
    featured: false,
    content: [
      {
        type: "p",
        text: "Almost every growing business runs on spreadsheets, and for good reason. They are flexible, familiar, and free. A spreadsheet is the fastest way to get a process working. The trouble starts later, when the spreadsheet quietly stops being a tool that supports the process and becomes the process itself.",
      },
      { type: "h2", text: "When the spreadsheet becomes the risk" },
      {
        type: "p",
        text: "The warning signs are familiar to anyone who has scaled a team. One person understands how the file really works. A single wrong cell can distort a whole report. Multiple versions circulate and nobody is sure which is current. The work of keeping the spreadsheet accurate starts to rival the work it was meant to track.",
      },
      {
        type: "list",
        items: [
          "Critical logic lives in formulas only one person can safely edit.",
          "Updates depend on someone remembering to make them, on time, every time.",
          "There is no reliable record of who changed what, or why.",
          "Errors are found downstream, after they have already caused a problem.",
          "Growth makes it worse, because volume multiplies the manual effort.",
        ],
      },
      {
        type: "quote",
        text: "A spreadsheet is a great place to figure out a process. It is a dangerous place to depend on one.",
      },
      { type: "h2", text: "What moving to a system actually changes" },
      {
        type: "p",
        text: "Moving from a spreadsheet to a system does not mean abandoning the logic you built. It means encoding that logic somewhere it can run reliably, consistently, and without depending on one person's attention. The rules that lived in formulas become rules the system enforces. The manual updates become automatic. The exceptions get surfaced instead of discovered.",
      },
      {
        type: "p",
        text: "CargoMatiq grew out of exactly this pattern in freight. Reconciliation often starts life as a spreadsheet: paste in the invoice, compare against agreed rates, highlight the differences. It works until volume turns it into a daily grind with real financial risk attached. Turning that spreadsheet into a system means the intake, matching, and exception flagging simply happen, and the team reviews results instead of assembling them.",
      },
      { type: "h2", text: "How to make the move without the disruption" },
      {
        type: "p",
        text: "The transition does not have to be a rip-and-replace project. The reliable path is to take the single most load-bearing spreadsheet, the one whose failure would hurt most, and turn that specific workflow into a system first. You keep the logic you trust, remove the manual effort around it, and prove the value before expanding.",
      },
      {
        type: "p",
        text: "Spreadsheets got you here, and that is worth respecting. But the next stage of growth usually depends on turning your best spreadsheets into systems that run on their own, so the business stops being held together by manual coordination and starts running on reliable execution.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Shape consumed by the blog listing client component. */
export type BlogArticle = {
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image?: string;
  featured: boolean;
  hasImage?: boolean;
};

/** Map a BlogPost to the listing card shape, with slug as a full href. */
export function toBlogArticle(post: BlogPost): BlogArticle {
  return {
    title: post.title,
    slug: `/blog/${post.slug}`,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    excerpt: post.excerpt,
    image: post.image,
    featured: post.featured,
  };
}
