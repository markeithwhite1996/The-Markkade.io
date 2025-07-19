// Case 1 - Det. Markk Story Script

const { jsPDF } = window.jspdf;

const state = {
  narrative: `Night has swallowed the city whole.  
The neon glow of Club HEX flickers in the rain-slicked alley.  
You step into the chaos — a brutal murder scene where Jason Carter lies dead, a knife buried deep in his chest.  
This isn’t just a simple stabbing. You can feel the dark web of debts, lies, and rage choking the night.\n\nYour job: unravel the truth — before the shadows swallow another life.`,
  suspects: [],
  evidence: [],
  fullStoryLog: [],
  caseSolved: false,
  wrongArrests: [],
};

const initialActions = [
  { id: 'questionBouncer', label: 'Grill Jake the Bouncer', type: 'question' },
  { id: 'searchVictimBody', label: 'Search Jason’s Body', type: 'investigate' },
  { id: 'interviewDJ', label: 'Interview DJ Tony', type: 'question' },
  { id: 'checkSurveillance', label: 'Check Club Security Footage', type: 'investigate' },
  { id: 'checkAlley', label: 'Inspect the Crime Alley', type: 'investigate' },
  { id: 'visitDoorman', label: 'Confront Doorman Rick', type: 'question' },
  { id: 'talkBartender', label: 'Question Bartender Carla', type: 'question' },
  { id: 'searchLockerRoom', label: 'Search Locker Room', type: 'investigate' },
  { id: 'inspectBackroom', label: 'Investigate Backroom', type: 'investigate' },
  { id: 'reviewForensics', label: 'Review Forensic Reports', type: 'investigate' },
  { id: 'interviewWaitress', label: 'Speak with Waitress Nina', type: 'question' },
  { id: 'checkCellPhone', label: 'Examine Jason’s Cell Phone', type: 'investigate' },
  { id: 'tailSuspect', label: 'Tail Suspicious Figure', type: 'stakeout' },
  { id: 'interrogateRival', label: 'Interrogate Rival Gang Member', type: 'question' },
  { id: 'searchTrash', label: 'Search Dumpster & Trash', type: 'investigate' },
  { id: 'callBackup', label: 'Call for Police Backup', type: 'action' },
  { id: 'retreat', label: 'Retreat and Reassess', type: 'action' },
  { id: 'checkVIPRoom', label: 'Check VIP Room', type: 'investigate' },
  { id: 'questionManager', label: 'Question Club Manager', type: 'question' },
  { id: 'inspectTattoo', label: 'Inspect Tattoo on Suspect', type: 'investigate' },
  { id: 'visitPharmacy', label: 'Visit Local Pharmacy', type: 'investigate' },
  { id: 'interviewSecurity', label: 'Interview Club Security Staff', type: 'question' },
  { id: 'checkPhoneRecords', label: 'Check Victim’s Phone Records', type: 'investigate' },
  { id: 'investigateRumors', label: 'Investigate Local Rumors', type: 'investigate' },
  { id: 'searchAbandonedWarehouse', label: 'Search Abandoned Warehouse', type: 'investigate' },
  { id: 'followMoneyTrail', label: 'Follow Money Trail', type: 'investigate' },
  { id: 'interviewExGirlfriend', label: 'Interview Victim’s Ex-Girlfriend', type: 'question' },
  { id: 'checkDrugDealer', label: 'Check Local Drug Dealer', type: 'question' },
  { id: 'stakeoutBackAlley', label: 'Stakeout Back Alley', type: 'stakeout' },
  { id: 'checkTextMessages', label: 'Analyze Text Messages', type: 'investigate' },
  { id: 'questionTaxiDriver', label: 'Question Taxi Driver', type: 'question' },
  { id: 'searchCar', label: 'Search Victim’s Car', type: 'investigate' },
  { id: 'checkBankRecords', label: 'Check Victim’s Bank Records', type: 'investigate' },
  { id: 'interviewWitness', label: 'Interview Eyewitness', type: 'question' },
];

const dialogueTree = {
  questionBouncer: {
    narrative:
`Jake’s face is a granite mask under the harsh alley light, the familiar twitch of a cigarette burnt stub between his fingers.  
"Heard Jason arguing like a rabid dog with some guy called Derek Mills — the type you don’t want to cross." Jake’s voice is low, grim.  
"He kept talking about 'payback' and 'final warning.' After that, Derek stormed off into the night.  
But that wasn’t all — Jake leans in, voice dropping: "I caught sight of another shadow too. Some hoodie-wearing ghost hanging near the alley entrance, watching, waiting."  
The air tastes bitter. Something tells you this night hides more than a simple robbery gone wrong.

What’s your next move?`,
    evidence: `Jake reports violent confrontation between Jason and Derek Mills.\nNotes presence of mysterious black-hooded observer.`,
    addSuspects: ['Derek Mills', 'Unknown Hooded Man'],
    nextActions: [
      { id: 'questionDerek', label: 'Track Down Derek Mills', type: 'question' },
      { id: 'interviewDJ', label: 'Question DJ Tony', type: 'question' },
      { id: 'searchVictimBody', label: 'Search Jason’s Body', type: 'investigate' },
      { id: 'visitDoorman', label: 'Ask Doorman Rick About Derek', type: 'question' },
    ],
  },

  searchVictimBody: {
    narrative:
`Jason’s cold, lifeless eyes stare into the void as you flip him onto his back, careful not to disturb the gruesome wound.  
You find a tattered wallet, a folded photo of a young woman — maybe a sister?  
Inside, a pack of pills half empty, their label marked “Oxycodone.” A crumpled note slips from his coat pocket: "Meet me behind the club. Last chance. Don’t make me come looking."  
The note smells faintly of smoke and desperation.  
Your gut tightens. This was no random attack.

Where to now?`,
    evidence: `Victim was taking Oxycodone — possible addiction.\nFound threatening note demanding a meeting behind club.`,
    nextActions: [
      { id: 'questionBouncer', label: 'Ask Jake About The Note', type: 'question' },
      { id: 'checkSurveillance', label: 'Review Security Footage', type: 'investigate' },
      { id: 'interviewDJ', label: 'Question DJ Tony Again', type: 'question' },
      { id: 'checkCellPhone', label: 'Examine Jason’s Cell Phone', type: 'investigate' },
    ],
  },

  interviewDJ: {
    narrative:
`Tony, sweat beading on his temple, spins tracks like a man possessed.  
He seems jittery, avoiding your gaze. "Jason was in deep," he admits.  
"Money trouble. Heard whispers about a drug debt — but this club... it’s a cesspool. Everyone’s got a secret."  
Tony glances toward the VIP room. "If you want the truth, check with Lila — she runs the backroom. But be careful — she’s got teeth."  
He pulls out a pack of smokes, lights one with shaking hands.  
A shadow lurks behind the bar. You feel the club watching.

Next steps?`,
    evidence: `Victim was tangled in drug debts.\nLila runs the club’s dangerous backroom scene.`,
    addSuspects: ['Lila Harper', 'Derek Mills'],
    nextActions: [
      { id: 'questionLila', label: 'Confront Lila Harper', type: 'question' },
      { id: 'checkAlley', label: 'Inspect Crime Alley', type: 'investigate' },
      { id: 'searchVictimBody', label: 'Re-examine Jason’s Body', type: 'investigate' },
      { id: 'talkBartender', label: 'Question Bartender Carla', type: 'question' },
    ],
  },

  checkSurveillance: {
    narrative:
`The security feed flickers, grainy and corrupted.  
You watch as a hooded figure trails Jason through the club, tension in every step.  
At 11:47 PM, the figure corners Jason in the alley — a heated argument explodes in shadows.  
The feed cuts before the fatal strike, but you catch a glimpse of a glint — a silver cufflink on the attacker’s wrist.  
Your mind races: whose cufflink?  
You rewind, looking for clues in every frame.`,
    evidence: `Security footage shows hooded attacker with silver cufflink.\nFootage corruption suggests tampering.`,
    nextActions: [
      { id: 'questionBouncer', label: 'Press Jake on Security Tampering', type: 'question' },
      { id: 'checkAlley', label: 'Inspect Crime Alley Again', type: 'investigate' },
      { id: 'questionLila', label: 'Challenge Lila About Footage', type: 'question' },
      { id: 'talkBartender', label: 'Ask Bartender Carla About Cufflink', type: 'question' },
    ],
  },

  checkAlley: {
    narrative:
`You comb the alley again, now wet with rain and the stench of spilled whiskey.  
Near the dumpster, a faint smear of blood leads to a crushed cigarette pack — Marlboro Reds, but one strange thing: a lipstick stain on the filter.  
Nearby, a torn piece of fabric catches your eye — black lace, delicate and out of place.  
Someone wanted to send a message.  
You feel eyes on you — club security is watching.`,
    evidence: `Blood smear with cigarette butts bearing lipstick stain.\nTorn black lace fabric found near scene.`,
    addSuspects: ['Unknown Woman'],
    nextActions: [
      { id: 'questionBouncer', label: 'Ask Jake About Black Lace', type: 'question' },
      { id: 'questionLila', label: 'Question Lila About Female Presence', type: 'question' },
      { id: 'interviewDJ', label: 'Press Tony for Gossip', type: 'question' },
      { id: 'searchTrash', label: 'Search Dumpster & Trash', type: 'investigate' },
    ],
  },

  visitDoorman: {
    narrative:
`Rick, the doorman, looks you up and down with weary eyes.  
"Heard a scuffle near the back door around midnight," he says.  
"Jason wasn’t allowed back there, but I saw a woman in a red dress sneaking around. Didn’t get a good look, but she looked spooked."  
Rick fiddles nervously with his badge.  
"Also, Lila’s been on edge. Had a visitor earlier — some guy in a suit with a strange tattoo on his hand."  
You jot down the details.  
What next?`,
    evidence: `Doorman saw a woman in a red dress lurking near the back.\nMentions mysterious suited visitor with tattoo.`,
    addSuspects: ['Unknown Woman in Red Dress', 'Mysterious Suited Man'],
    nextActions: [
      { id: 'questionLila', label: 'Press Lila About Visitors', type: 'question' },
      { id: 'tailSuspect', label: 'Watch the Club Entrance', type: 'stakeout' },
      { id: 'searchLockerRoom', label: 'Check Locker Room', type: 'investigate' },
    ],
  },

  talkBartender: {
    narrative:
`Carla wipes a glass, eyes darting to the backroom door.  
"Jason owed a lot of people. But that silver cufflink? That’s not from here. Heard rumors about some rich patrons from the west side."  
She leans closer, voice dropping: "Lila’s got her own secrets, and some say she’s mixed up with the city’s underground.  
If you want the truth, look where the shadows fall."  
Carla’s glance shifts to a shattered whiskey bottle on the floor.`,
    evidence: `Bartender hints at wealthy patrons with silver cufflinks.\nSuggests Lila’s ties to underground crime.`,
    addSuspects: ['Wealthy Patrons', 'Lila Harper'],
    nextActions: [
      { id: 'inspectBackroom', label: 'Investigate Backroom', type: 'investigate' },
      { id: 'questionLila', label: 'Confront Lila Harper', type: 'question' },
      { id: 'searchTrash', label: 'Search Dumpster & Trash', type: 'investigate' },
    ],
  },

  searchLockerRoom: {
    narrative:
`You pry open a locker, finding a crumpled pack of cigarettes — Marlboro Reds with lipstick marks.  
There’s a folded note stuck inside, scrawled hastily: "Can’t keep hiding. Meet me. Midnight."  
Sounds like the same note from Jason’s coat.  
Your mind races — was Jason meeting someone from inside the club?  
Suddenly, a shadow moves in the corridor. You snap your head around.`,
    evidence: `Locker contains cigarette pack with lipstick marks.\nFound matching threatening note referencing midnight meeting.`,
    nextActions: [
      { id: 'questionBouncer', label: 'Ask Jake About Midnight Meetings', type: 'question' },
      { id: 'questionLila', label: 'Press Lila About Club Insiders', type: 'question' },
      { id: 'tailSuspect', label: 'Stakeout Club Entrance', type: 'stakeout' },
    ],
  },

  inspectBackroom: {
    narrative:
`The backroom reeks of stale smoke and cheap perfume.  
You find scattered playing cards, a hidden stash of pills, and a broken phone screen displaying threatening texts.  
The texts mention a "final warning" and "payback."  
A faint trail of perfume leads to a broken window — perfect for a quick escape.  
You realize someone planned this carefully.`,
    evidence: `Backroom contains drug stash and threatening texts.\nSigns of forced escape through broken window.`,
    nextActions: [
      { id: 'questionLila', label: 'Confront Lila About Backroom', type: 'question' },
      { id: 'searchTrash', label: 'Search Dumpster & Trash', type: 'investigate' },
      { id: 'tailSuspect', label: 'Stakeout Escape Route', type: 'stakeout' },
    ],
  },

  reviewForensics: {
    narrative:
`The forensic report confirms the fatal wound was inflicted with a sharp blade — precise, almost surgical.  
Traces of a rare chemical compound are found on the victim’s clothing — something used in exclusive perfumes.  
Fingerprints on the victim’s phone show an unknown smudge — too faint to identify but enough to suggest a struggle.  
Your mind pieces together a profile of the killer — careful, possibly with access to the club’s inner circles.`,
    evidence: `Cause of death: sharp blade.\nRare chemical traces linked to exclusive perfume.\nUnidentified fingerprints on victim’s phone.`,
    nextActions: [
      { id: 'questionLila', label: 'Ask Lila About Perfume', type: 'question' },
      { id: 'interviewWaitress', label: 'Interview Waitress Nina', type: 'question' },
      { id: 'checkAlley', label: 'Re-inspect Crime Alley', type: 'investigate' },
    ],
  },

  interviewWaitress: {
    narrative:
`Nina’s hands tremble as she sips coffee in the staff lounge.  
"Jason was scared," she whispers. "He said someone was watching him. Lila’s men have been acting strange lately."  
She pulls a folded photo from her pocket — a woman in red, face blurred.  
"She showed up the night Jason was killed. Said she wanted to help, but then disappeared."  
Nina glances nervously toward the back door.  
Could this mysterious woman be the key?`,
    evidence: `Waitress reveals Jason’s fear of being watched.\nMentions mysterious woman in red at the club the night of the murder.`,
    addSuspects: ['Unknown Woman in Red Dress'],
    nextActions: [
      { id: 'visitDoorman', label: 'Ask Doorman Rick About Woman in Red', type: 'question' },
      { id: 'tailSuspect', label: 'Stakeout Club Back Entrance', type: 'stakeout' },
      { id: 'checkSurveillance', label: 'Review Footage for Woman in Red', type: 'investigate' },
    ],
  },

  checkCellPhone: {
    narrative:
`Jason’s phone is cracked but still powers on.  
You find messages exchanged with someone named "M" — cryptic notes about debts, threats, and "meeting to settle."  
Photos of cash bundles and dark alley meetings.  
A last message: "It’s over if you don’t show."  
Your gut screams this "M" is crucial.  
Who could it be?`,
    evidence: `Phone contains threatening messages from "M".\nEvidence of drug debts and secret meetings.`,
    nextActions: [
      { id: 'interrogateRival', label: 'Track Down Rival Gang Member "M"', type: 'question' },
      { id: 'questionDerek', label: 'Ask Derek About "M"', type: 'question' },
      { id: 'tailSuspect', label: 'Stakeout Suspected Meeting Spot', type: 'stakeout' },
    ],
  },

  tailSuspect: {
    narrative:
`You shadow the figure through rain-slicked streets, heart pounding.  
The trail leads to a rundown warehouse, where muffled voices argue.  
A silhouette throws something metallic to the ground — a silver cufflink, unmistakably the same as seen on the security footage.  
Suddenly, footsteps approach behind you...  
Time to make a decision.`,
    evidence: `Suspect drops silver cufflink matching footage.\nWarehouse is a suspected hideout.`,
    nextActions: [
      { id: 'interrogateRival', label: 'Confront Rival Gang Member', type: 'question' },
      { id: 'callBackup', label: 'Call Police Backup', type: 'action' },
      { id: 'retreat', label: 'Fall Back for Now', type: 'action' },
    ],
  },

  interrogateRival: {
    narrative:
`The rival gang member snarls, "Yeah, I did warn Jason. But I didn’t kill him. That cufflink? You’re barking up the wrong tree."  
He points a jagged knife at you, voice dripping with menace.  
"Ask around about the club’s owner — she’s got plenty of enemies."  
The threat hangs heavy.  
What do you do?`,
    evidence: `Rival gang denies murder but threatens.\nSuggests Lila Harper has many enemies.`,
    addSuspects: ['Lila Harper', 'Rival Gang'],
    nextActions: [
      { id: 'questionLila', label: 'Press Lila Harper Again', type: 'question' },
      { id: 'callBackup', label: 'Bring Police to Interrogate', type: 'action' },
      { id: 'retreat', label: 'Pull Back and Reassess', type: 'action' },
    ],
  },

  searchTrash: {
    narrative:
`Among the discarded bottles and crushed cans, you find a torn piece of a flyer — advertising a secret party tonight at an abandoned warehouse.  
You also spot a bloodied glove, fabric matching the black lace found earlier.  
Someone tried to hide evidence here — but why?  
Your pulse quickens. The case twists deeper.`,
    evidence: `Found flyer for secret warehouse party.\nBloodied glove with black lace fabric.`,
    nextActions: [
      { id: 'tailSuspect', label: 'Stakeout Warehouse Party', type: 'stakeout' },
      { id: 'checkAlley', label: 'Re-examine Crime Alley', type: 'investigate' },
      { id: 'interviewWaitress', label: 'Ask Waitress About Warehouse', type: 'question' },
    ],
  },

  callBackup: {
    narrative:
`You call in police backup. Sirens wail in the distance as the tension thickens.  
Backup arrives, ready to assist with a raid or detainment.  
But the suspect bolts, disappearing into the night.  
The hunt intensifies.  
Do you pursue or regroup?`,
    nextActions: [
      { id: 'tailSuspect', label: 'Pursue Suspect', type: 'stakeout' },
      { id: 'retreat', label: 'Regroup and Plan Next Move', type: 'action' },
    ],
  },

  retreat: {
    narrative:
`You slip back into the shadows, heart pounding, mind racing.  
Sometimes patience wins the game.  
You review the clues gathered so far, piecing together a timeline of deceit, desperation, and betrayal.  
Time to decide your next move carefully.`,
    nextActions: [
      { id: 'questionBouncer', label: 'Review Jake’s Statements', type: 'question' },
      { id: 'searchVictimBody', label: 'Re-examine Victim’s Body', type: 'investigate' },
      { id: 'interviewDJ', label: 'Talk to DJ Tony Again', type: 'question' },
      { id: 'checkSurveillance', label: 'Revisit Security Footage', type: 'investigate' },
    ],
  },

  checkVIPRoom: {
    narrative:
`The VIP room reeks of expensive perfume and whispered threats.  
You find a shattered glass with fingerprints — too smudged to ID.  
A ledger sits half-hidden under a velvet cushion, listing payments to unknown recipients.  
The name “M” pops up repeatedly.  
Something about this room screams of secrets paid for in blood.`,
    evidence: `Ledger with payments to "M".\nFingerprint-smudged broken glass.`,
    nextActions: [
      { id: 'checkPhoneRecords', label: 'Review Victim’s Phone Records', type: 'investigate' },
      { id: 'interviewSecurity', label: 'Question Security Staff', type: 'question' },
      { id: 'questionManager', label: 'Interview Club Manager', type: 'question' },
    ],
  },

  questionManager: {
    narrative:
`The club manager, slick and calculating, smiles thinly.  
"Jason was trouble. Always poking his nose where it didn’t belong."  
He mentions a "big deal" Jason was involved with — one that could bring the whole club down.  
When pressed about the security footage, he deflects, "Those tapes get erased regularly. You know how it is."  
His eyes flicker with something — fear? Guilt?`,
    evidence: `Manager hints at major illicit dealings.\nMentions routine erasure of security footage.`,
    addSuspects: ['Club Manager'],
    nextActions: [
      { id: 'checkSurveillance', label: 'Demand Security Footage', type: 'investigate' },
      { id: 'inspectTattoo', label: 'Investigate Tattoo Mentioned by Doorman', type: 'investigate' },
      { id: 'interviewWaitress', label: 'Press Waitress Nina Again', type: 'question' },
    ],
  },

  inspectTattoo: {
    narrative:
`The tattoo on the suited man’s hand is a black serpent coiled around a dagger — a symbol tied to a secret society rumored to control the city’s underworld.  
You recall overhearing the club manager mentioning this symbol in hushed tones.  
Could this mysterious visitor be the mastermind?  
You wonder if this man’s shadow lurks in every corner of the city.`,
    evidence: `Tattoo linked to secret criminal society.\nPossible connection to club manager and mysterious visitor.`,
    addSuspects: ['Mysterious Suited Man', 'Club Manager'],
    nextActions: [
      { id: 'tailSuspect', label: 'Stakeout Suited Man', type: 'stakeout' },
      { id: 'interrogateRival', label: 'Check Rival Gang Connection', type: 'question' },
      { id: 'callBackup', label: 'Alert Police About Suspected Mastermind', type: 'action' },
    ],
  },

  visitPharmacy: {
    narrative:
`The local pharmacy clerk remembers Jason — a regular customer with a shaky hand.  
"He was picking up oxycodone prescriptions every few days," the clerk says.  
"But lately, someone else was coming by, paying cash, asking strange questions about Jason’s habits."  
You suspect a dealer is trying to cover tracks or monitor Jason’s addiction.`,
    evidence: `Pharmacy confirms oxycodone prescriptions.\nUnknown visitor asking about Jason’s habits.`,
    nextActions: [
      { id: 'checkDrugDealer', label: 'Track Down Local Drug Dealer', type: 'question' },
      { id: 'checkPhoneRecords', label: 'Investigate Phone Records for Contacts', type: 'investigate' },
      { id: 'interviewExGirlfriend', label: 'Talk to Victim’s Ex-Girlfriend', type: 'question' },
    ],
  },

  interviewSecurity: {
    narrative:
`Club security staff are tight-lipped but reveal tension on the night of the murder.  
"Someone threatened to expose the club’s secrets," one whispers.  
Another recalls a suspicious van parked outside — with no license plates.  
They remember a black car leaving hastily just after midnight.  
Your mind races to piece together who might be behind this covert operation.`,
    evidence: `Security mentions threats and suspicious vehicles.\nBlack car with no plates seen leaving.`,
    nextActions: [
      { id: 'tailSuspect', label: 'Stakeout Suspicious Vehicles', type: 'stakeout' },
      { id: 'checkBankRecords', label: 'Investigate Financial Transactions', type: 'investigate' },
      { id: 'questionManager', label: 'Press Manager About Threats', type: 'question' },
    ],
  },

  checkPhoneRecords: {
    narrative:
`The phone records reveal numerous calls between Jason and "M" over the past weeks.  
Several calls come from blocked numbers, others from an untraceable burner phone.  
Location pings show meetings near the docks, far from the club’s usual territory.  
You start to wonder if the crime’s reach extends beyond the club walls.`,
    evidence: `Phone call logs show frequent contact with "M".\nMeeting locations at docks.`,
    nextActions: [
      { id: 'searchAbandonedWarehouse', label: 'Investigate Docks and Warehouse', type: 'investigate' },
      { id: 'tailSuspect', label: 'Stakeout Dockside Meetings', type: 'stakeout' },
      { id: 'interviewExGirlfriend', label: 'Check In With Ex-Girlfriend', type: 'question' },
    ],
  },

  investigateRumors: {
    narrative:
`You sift through whispers in the city’s underbelly — talk of debts, betrayals, and a secret society controlling the clubs.  
Rumors link Lila Harper to a shadowy figure known only as “The Serpent.”  
The deeper you dig, the more tangled the web becomes.  
Who pulls the strings behind the scenes?`,
    evidence: `Rumors of secret society involvement.\nLila Harper linked to “The Serpent.”`,
    addSuspects: ['Lila Harper', 'Mysterious Suited Man'],
    nextActions: [
      { id: 'inspectTattoo', label: 'Investigate Tattoo Symbol', type: 'investigate' },
      { id: 'questionLila', label: 'Confront Lila About Rumors', type: 'question' },
      { id: 'callBackup', label: 'Inform Authorities', type: 'action' },
    ],
  },
  // ... Add more nodes following same pattern up to 100+ ...
};

function handleArrest(suspect) {
  if(state.caseSolved){
    alert("The case is already closed.");
    return;
  }

  if(suspect === 'Derek Mills'){
    state.caseSolved = true;
    updateNarrative(
      `You place Derek Mills under arrest.  
Under the weight of mounting evidence and your relentless interrogation, Derek breaks down, confessing to stabbing Jason Carter in a rage-fueled debt dispute.  
Justice has been served — but the night still reeks of darkness.`
    );
    appendToFullStory(`Derek Mills arrested and confessed. Case closed.`);
    renderActions([]);
    showControlButtons();
  } else {
    if(!state.wrongArrests.includes(suspect)){
      state.wrongArrests.push(suspect);
    }
    updateNarrative(
      `You arrest ${suspect}, but the evidence doesn’t hold up. They’re released after hours of questioning.  
The killer remains out there. Keep digging.`
    );
    appendToFullStory(`${suspect} was arrested but released due to insufficient evidence.`);
    renderActions(state.actions.length ? state.actions : initialActions);
  }
}

function updateNarrative(text) {
  const narrative = document.getElementById('narrative');
  narrative.style.opacity = 0;
  setTimeout(() => {
    narrative.textContent = text;
    narrative.style.opacity = 1;
  }, 200);
}

function appendToFullStory(text) {
  state.fullStoryLog.push(text);
  document.getElementById('fullStory').value = state.fullStoryLog.join('\n\n---\n\n');
}

function updateSuspects() {
  const list = document.getElementById('suspectItems');
  list.innerHTML = '';
  if(state.suspects.length === 0){
    list.innerHTML = '<li><em>No suspects identified yet</em></li>';
    return;
  }
  state.suspects.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    list.appendChild(li);
  });
}

function updateEvidence() {
  const evidenceLog = document.getElementById('evidenceLog');
  if(state.evidence.length === 0){
    evidenceLog.textContent = 'No evidence collected yet.';
    return;
  }
  evidenceLog.textContent = state.evidence.join('\n\n');
}

function renderActions(actions) {
  state.actions = actions;
  const actionsDiv = document.getElementById('actions');
  actionsDiv.innerHTML = '';

  if(state.caseSolved){
    // No more actions after case solved
    showControlButtons();
    return;
  }

  if(!actions || actions.length === 0){
    updateNarrative('No more leads available. Review evidence or suspects.');
    return;
  }

  actions.forEach(action => {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.textContent = action.label;
    btn.dataset.actionId = action.id;
    btn.onclick = () => handleAction(action.id);
    actionsDiv.appendChild(btn);
  });

  // Show Arrest buttons for all suspects
  state.suspects.forEach(suspect => {
    const arrestBtn = document.createElement('button');
    arrestBtn.className = 'action-btn arrest-btn';
    arrestBtn.textContent = `Arrest ${suspect}`;
    arrestBtn.onclick = () => handleArrest(suspect);
    actionsDiv.appendChild(arrestBtn);
  });

  updateSuspects();
  updateEvidence();
}

function handleAction(actionId) {
  if(state.caseSolved) return;

  const node = dialogueTree[actionId];
  if(!node){
    updateNarrative("That lead is unavailable.");
    return;
  }

  updateNarrative(node.narrative);
  appendToFullStory(node.narrative);

  if(node.evidence && !state.evidence.includes(node.evidence)){
    state.evidence.push(node.evidence);
  }

  if(node.addSuspects){
    node.addSuspects.forEach(s => {
      if(!state.suspects.includes(s)){
        state.suspects.push(s);
      }
    });
  }

  renderActions(node.nextActions);
}

// Copy and save story buttons
document.getElementById('copyStoryBtn').onclick = () => {
  navigator.clipboard.writeText(state.fullStoryLog.join('\n\n---\n\n')).then(() => {
    alert('Full story copied to clipboard!');
  });
};

document.getElementById('savePdfBtn').onclick = () => {
  const doc = new jsPDF();
  const storyText = state.fullStoryLog.join('\n\n---\n\n');
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const lines = doc.splitTextToSize(storyText, 180);
  let y = margin;
  lines.forEach((line) => {
    if(y > pageHeight - margin){
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 7;
  });
  doc.save('DetMarkk_Case1_Story.pdf');
};

function showControlButtons(){
  document.getElementById('controlButtons').style.display = 'flex';
}

// Initialize UI on load
updateNarrative(state.narrative);
appendToFullStory(state.narrative);
renderActions(initialActions);
updateSuspects();
updateEvidence();
