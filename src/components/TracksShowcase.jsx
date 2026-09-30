'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MagicalCard from './MagicalCard';
import { User, Heart, GraduationCap, Briefcase, CheckCircle, Clock, Sparkles, BookOpen } from 'lucide-react';

const TRACKS_DATA = [
  {
    id: 'adults',
    title: 'Group 1: General Adults (18+)',
    badge: '52-Week Master Program',
    icon: User,
    image: '/images/comic_adult_track.jpg',
    tagline: 'Foundational Mental Health Literacy & Everyday Emotional Regulation',
    description: 'Designed for adults navigating workplace demands, relationships, personal overload, and habit sustainability. You will master emotional vocabulary, recognize chronic stress early, and build durable boundaries.',
    stats: [
      { label: 'Total Lessons', value: '52 Weekend Sessions' },
      { label: 'Weekly Rhythm', value: '10 Mins / Weekend' },
      { label: 'Cohort Format', value: '6 Adults Voice Room' },
    ],
    highlights: [
      'Notice, name, and regulate emotions without self-judgment',
      'Cognitive defusion: gentle distance from catastrophic thoughts',
      'Burnout recovery boundaries and restorative sleep rituals',
      'Supportive relationships without taking on everyone else\'s distress'
    ],
    sampleScript: {
      lessonNumber: 'Lesson 05',
      lessonTitle: 'Emotional Vocabulary: Notice, Name, Understand',
      scriptSnippet: '"When anxiety hits, your brain shouts \'DANGER!\' even if you just opened an email. Instead of fighting the adrenaline, pause for 10 seconds. Say silently: \'I am feeling tension in my chest, and that is okay.\' Naming the state activates your prefrontal cortex, cutting the panic loop in half."'
    }
  },
  {
    id: 'parents',
    title: 'Group 2: Parents & Caregivers',
    badge: '52-Week Master Program',
    icon: Heart,
    image: '/images/comic_parent_track.jpg',
    tagline: 'Supporting a Minor Child with Emotion Coaching & Zero Diagnostic Labeling',
    description: 'Empowers parents and caregivers to listen effectively, co-regulate during emotional storms, collaborate with schools, and notice concerning behavioral changes without amateur diagnosing.',
    stats: [
      { label: 'Total Lessons', value: '52 Weekend Sessions' },
      { label: 'Weekly Rhythm', value: '10 Mins / Weekend' },
      { label: 'Parent Rule', value: 'No Children in Adult Rooms' },
    ],
    highlights: [
      'The Regulated Parent: calm your own nervous system before responding',
      'Emotion coaching: validating feelings while holding firm safety limits',
      'School collaboration without defensive conflict',
      'Clear safety escalation: knowing when to seek clinical child specialists'
    ],
    sampleScript: {
      lessonNumber: 'Lesson 35',
      lessonTitle: 'The Regulated Parent: Listening Without Escalation',
      scriptSnippet: '"A dysregulated adult cannot regulate a dysregulated child. When your teenager slams the door, match their volume with your lowest pitch. Drop your shoulders. Say: \'I see how angry you are right now. I am right here when you want to talk.\' Connection always precedes correction."'
    }
  },
  {
    id: 'students',
    title: 'Group 3: University & College Students (18+)',
    badge: '4-Week Intensive + 30-Day Follow-up',
    icon: GraduationCap,
    image: '/images/comic_student_track.jpg',
    tagline: 'Overcoming Academic Overwhelm, Imposter Syndrome & Dorm Life Isolation',
    description: 'Specifically architected for university and college students facing heavy exam periods, thesis deadlines, comparison loops, and identity transitions.',
    stats: [
      { label: 'Curriculum', value: '10 Total Lessons' },
      { label: 'Structure', value: '7 Daily (W1) + 3 Weekend' },
      { label: 'Post-Course', value: '30-Day Wellbeing Pulse' },
    ],
    highlights: [
      'Breaking the paralysis of perfectionism and procrastination',
      'Exam day panic relief: the 5-4-3-2-1 sensory grounding anchor',
      'Navigating roommate friction and academic advisor boundaries',
      'Privacy protection: campus administrators never see your mood logs'
    ],
    sampleScript: {
      lessonNumber: 'Lesson 02',
      lessonTitle: 'Imposter Syndrome in Higher Ed',
      scriptSnippet: '"You are sitting in a lecture hall convinced everyone else understands quantum physics except you. That is not incompetence; that is the spotlight effect. Take 5 minutes to write down three real problems you solved this semester. Evidence beats anxiety every time."'
    }
  },
  {
    id: 'employees',
    title: 'Group 4: Workplace Professionals',
    badge: '4-Week Intensive + 30-Day Follow-up',
    icon: Briefcase,
    image: '/images/comic_employee_track.jpg',
    tagline: 'Defeating Workplace Burnout, Meeting Fatigue & Unrealistic Demands',
    description: 'For working professionals drowning in back-to-back video calls, shifting deadlines, and unclear corporate expectations. Learn to set professional boundaries with grace.',
    stats: [
      { label: 'Curriculum', value: '10 Total Lessons' },
      { label: 'Structure', value: '7 Daily (W1) + 3 Weekend' },
      { label: 'Privacy', value: 'Zero Employer Data Access' },
    ],
    highlights: [
      'The 5 PM Cognitive Shutdown: closing the mental tabs',
      'Saying \'No\' without guilt or jeopardizing professional credibility',
      'Meeting fatigue countermeasures: defending focus blocks',
      'Managing difficult manager dynamics and peer conflicts'
    ],
    sampleScript: {
      lessonNumber: 'Lesson 04',
      lessonTitle: 'Workplace Boundaries & Saying No Gracefully',
      scriptSnippet: '"When a colleague dumps an urgent request on your desk at 4:45 PM, pause before saying yes. Use the trade-off formula: \'I can certainly take this on, but it means postponing the client deck until Tuesday. Which would you prefer I prioritize?\' Protect your bandwidth without burning bridges."'
    }
  }
];

export default function TracksShowcase() {
  const [activeTab, setActiveTab] = useState('adults');
  const currentTrack = TRACKS_DATA.find((t) => t.id === activeTab) || TRACKS_DATA[0];

  return (
    <section id="tracks" className="tracks-section">
      <div className="container">
        <div className="section-header-block">
          <div className="pill-badge">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
            <span>TAILORED CURRICULUM • 4 DISTINCT ADULT GROUPS</span>
          </div>
          <h2 className="section-title">
            Choose Your <span className="text-amber-gradient">Dedicated Learning Track</span>
          </h2>
          <p className="section-description">
            Because a busy working parent needs different examples than a college student facing finals.
            Select the stream that matches your life stage.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="tracks-tabs-bar">
          {TRACKS_DATA.map((track) => {
            const Icon = track.icon;
            const isActive = activeTab === track.id;
            return (
              <button
                key={track.id}
                className={`track-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(track.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span>{track.title.split(':')[0]}</span>
                <span className="tab-pill-mini">{track.badge.includes('52') ? '52 Wk' : '4 Wk'}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Display Card */}
        <MagicalCard className="track-display-card" maxTilt={6} glowColor="rgba(79, 116, 98, 0.15)">
          <div className="track-card-content">
            {/* Visual Image Column */}
            <div className="track-visual-column">
              <div className="track-image-frame">
                <Image
                  src={currentTrack.image}
                  alt={currentTrack.title}
                  width={520}
                  height={390}
                  className="track-feature-img"
                  priority
                />
                <div className="track-image-overlay-badge">
                  <span>{currentTrack.badge}</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="track-stats-row">
                {currentTrack.stats.map((stat, i) => (
                  <div key={i} className="stat-box">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-val">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info & Sample Column */}
            <div className="track-info-column">
              <div className="track-pill-status">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
                <span>{currentTrack.badge}</span>
              </div>
              <h3 className="track-headline">{currentTrack.title}</h3>
              <p className="track-tagline">{currentTrack.tagline}</p>
              <p className="track-body">{currentTrack.description}</p>

              {/* Key Highlights */}
              <div className="track-highlights-list">
                <div className="highlights-title">Core Outcomes &amp; Skills:</div>
                {currentTrack.highlights.map((item, idx) => (
                  <div key={idx} className="highlight-item">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Sample Voiceover Excerpt from Docx */}
              <div className="sample-voiceover-card">
                <div className="sample-voiceover-header">
                  <BookOpen className="w-4 h-4 text-amber-400 mr-2" />
                  <span className="sample-lesson-tag">{currentTrack.sampleScript.lessonNumber}:</span>
                  <span className="sample-lesson-title">{currentTrack.sampleScript.lessonTitle}</span>
                </div>
                <p className="sample-script-quote">{currentTrack.sampleScript.scriptSnippet}</p>
                <span className="sample-source-label">✓ Actual voiceover script from clinical course curriculum</span>
              </div>
            </div>
          </div>
        </MagicalCard>
      </div>
    </section>
  );
}
