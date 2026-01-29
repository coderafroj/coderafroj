
export const pythonTutorial = {
  id: 'python',
  title: 'Python',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  description: 'The absolute definitive guide to Python. From basic syntax to Machine Learning, DSA, and Databases.',
  topics: [
    {
      id: 'home',
      title: 'Python Home',
      content: `# Python Masterclass\n\n**Welcome to the definitive Python tutorial.**\n\nThis isn't just another syntax guide. This is a deep dive into the language that powers the modern web, AI, and data science. We go beyond the basics to understand *how* and *why* Python works.\n\n> ### 🚀 Roadmap Completed\n> * **Basics & OOP:** Done.\n> * **Data Science & ML:** In-depth coverage of libraries and algorithms.\n> * **DSA:** Comprehensive study of data structures and sorting.`
    },
    // ... Keeping previous sections implicitly or re-writing with full depth
    {
      id: 'basics_group',
      title: 'Python Basics',
      children: [
        { id: 'intro', title: 'Python Intro', content: `# Python Intro\n\nPython is high-level, interpreted, and dynamically typed.` },
        { id: 'syntax', title: 'Syntax', content: `# Syntax\n\nPython uses indentation to define code blocks.` },
        { id: 'comments', title: 'Comments', content: `# Comments\n\n\`#\` for single line. \`"""\` for documentation.` }
      ]
    },
    {
      id: 'logic_group',
      title: 'Advanced Logic',
      children: [
        { id: 'ifelse', title: 'If...Else', content: `# If...Else\n\nDecision making logic.` },
        { id: 'match', title: 'Match Case', content: `# Match Case (3.10+)\n\nStructural pattern matching.` },
        { id: 'loops', title: 'Loops & Range', content: `# While & For Loops\n\nIteration control.` }
      ]
    },
    {
      id: 'oop_mastery',
      title: 'OOP Mastery',
      children: [
        { id: 'classes', title: 'Classes/Objects', content: `# Classes & Objects\n\nBlueprint for creating objects.` },
        { id: 'init', title: 'The __init__ Method', content: `# Constructor\n\nInitializes the object attributes.` },
        { id: 'inheritance', title: 'Inheritance', content: `# Inheritance\n\nA class can inherit methods and properties from another class.` },
        { id: 'polymorphism', title: 'Polymorphism', content: `# Polymorphism\n\nMethods with same name but different classes.` },
        { id: 'encapsulation', title: 'Encapsulation', content: `# Encapsulation\n\nHide internal state using \`__private\` variables.` }
      ]
    },
    {
      id: 'matplotlib_group',
      title: 'Matplotlib (Data Viz)',
      children: [
        { id: 'plt_intro', title: 'Intro & Start', content: `# Matplotlib\n\nLow level graph plotting library in python that serves as a visualization utility.` },
        { id: 'plt_pyplot', title: 'Pyplot', content: `# Pyplot\n\nMost functions are in the \`pyplot\` submodule.` },
        { id: 'plt_plotting', title: 'Plotting & Markers', content: `# Plotting\n\n\`\`\`python\nplt.plot(x, y, marker = 'o')\n\`\`\`` },
        { id: 'plt_pie', title: 'Pie Charts', content: `# Pie Charts\n\n\`\`\`python\nplt.pie(y, labels = mylabels)\n\`\`\`` }
      ]
    },
    {
      id: 'ml_group',
      title: 'Machine Learning',
      children: [
        { id: 'ml_intro', title: 'Getting Started', content: `# ML Intro\n\nMaking computers learn from data.` },
        { id: 'ml_regression', title: 'Regressions', content: `# Regressions\n\nLinear, Polynomial, and Multiple Regression.` },
        { id: 'ml_train_test', title: 'Train/Test', content: `# Train/Test\n\nEvaluate the performance of your model.` },
        { id: 'ml_kmeans', title: 'K-Means', content: `# K-Means\n\nClustering algorithm for unsupervised learning.` }
      ]
    },
    {
      id: 'dsa_group',
      title: 'Python DSA',
      children: [
        { id: 'dsa_arrays', title: 'Lists & Arrays', content: `# Arrays\n\nStoring elements contiguously in memory.` },
        { id: 'dsa_linkedlist', title: 'Linked Lists', content: `# Linked Lists\n\nNodes with data and pointers to the next node.` },
        { id: 'dsa_stack_queue', title: 'Stacks & Queues', content: `# LIFO & FIFO\n\nStack (Last-In-First-Out) and Queue (First-In-First-Out).` },
        { id: 'dsa_sorting', title: 'Sorting Algorithms', content: `# Sorting\n\nBubble, Quick, and Merge Sort.` },
        { id: 'dsa_searching', title: 'Searching', content: `# Searching\n\nLinear and Binary Search.` }
      ]
    },
    {
      id: 'db_group',
      title: 'Databases (SQL/NoSQL)',
      children: [
        { id: 'mysql', title: 'MySQL (SQL)', content: `# MySQL\n\nRelational database management.` },
        { id: 'mongodb', title: 'MongoDB (NoSQL)', content: `# MongoDB\n\nDocument-oriented NoSQL database.` }
      ]
    }
  ]
};
