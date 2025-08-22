import { ScrollBar } from './components/scroll-bar';
import { AboutMe } from './sections/about-me.section';
import { InfoSection } from './sections/info.section';
import { TechStack } from './sections/tech-stack.section';
import { VisionMission } from './sections/vision-mission.section';
import { WhyNexaTech } from './sections/why-nexatech.section';
import { AchievementsRoadmap } from './sections/achievements-roadmap.section';
import { ContactSection } from './sections/contact.section';
import { MembersSection } from './sections/members.section';
import { ProjectsSection } from './sections/projects.section';
import { NavBoxes } from './components/nav-boxes';
import { SidebarNav } from './components/sidebar-nav';
import './styles/about-me.css';
import './styles/floating-button.css';
import './styles/glow-box.css';
import './styles/info-section.css';
import './styles/tech-stack.css';
import './styles/text-hover.css';
import './styles/title.css';
import './styles/vision-mission.css';
import './styles/why-nexatech.css';
import './styles/achievements-roadmap.css';
import './styles/contact.css';
import './styles/projects.css';
import './styles/members.css';
import './styles/sidebar-nav.css';
import './styles/chatbot.css';
import { Chatbot } from './components/chatbot';

function App() {
	return (
		<>
			<ScrollBar />
			<NavBoxes />
			<SidebarNav />
			<InfoSection />
			<AboutMe />
			<VisionMission />
			<ProjectsSection />
			<WhyNexaTech />
			<TechStack />
			<MembersSection />
			<AchievementsRoadmap />
			{/* Collaborations section intentionally hidden for now */}
			<ContactSection />
			<Chatbot />
		</>
	);
}

export default App;
