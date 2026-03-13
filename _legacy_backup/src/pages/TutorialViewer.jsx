
import { useParams } from 'react-router-dom';
import TutorialLayout from '../components/tutorial/TutorialLayout';
import { pythonTutorial } from '../data/tutorials/python';
import { cTutorial } from '../data/tutorials/c';
import { cppTutorial } from '../data/tutorials/cpp';
import { javaTutorial } from '../data/tutorials/java';

// Registry of all tutorials
const tutorialRegistry = {
    'python': pythonTutorial,
    'c': cTutorial,
    'cpp': cppTutorial,
    'java': javaTutorial
};

const TutorialViewer = () => {
    const { tutorialId } = useParams();
    const data = tutorialRegistry[tutorialId];

    if (!data) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-gray-400">Tutorial Not Found</p>
                </div>
            </div>
        );
    }

    return <TutorialLayout tutorialData={data} />;
};

export default TutorialViewer;
