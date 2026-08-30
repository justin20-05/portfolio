import { Cpu, Globe, Activity, Layers } from 'lucide-react';

export const person = {
  name: 'Justin Alviar',
  firstName: 'Justin',
  role: 'Full-stack engineer',
  email: 'justinjamesalviar@gmail.com',
  location: 'Remote',
};

export const projects = [
  {
    id: 'verifai',
    category: 'ai',
    title: 'VerifAI System',
    subtitle: 'Neural visual verification',
    description:
      'Machine learning-based AI image detection system leveraging MT-YOLOv6 for real-time visual validation and object classification.',
    tech: ['MT-YOLOv6', 'PyTorch', 'React', 'Tailwind CSS'],
    icon: Cpu,
    highlight: 'Sub-100ms inference',
    deepDive: {
      problem: 'Inefficient manual visual inspections causing throughput bottlenecks.',
      solution: 'Automated defect detection using custom-trained neural networks.',
      architecture:
        'ML microservice (PyTorch) connected via REST API to a React frontend dashboard.',
    },
  },
  {
    id: 'ibt-system',
    category: 'web',
    title: 'Integrated Bus Terminal System',
    subtitle: 'Transit operations platform',
    description:
      'Centralized management platform built for scheduling bus trips, managing terminal fees, and tracking bus company metrics.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: Globe,
    highlight: 'Billing & scheduling',
    deepDive: {
      problem:
        'Disjointed terminal management, manual logging, and frequent revenue discrepancies.',
      solution:
        'An integrated web platform digitizing trip scheduling, fee calculation, and operator access.',
      architecture:
        'Full MERN stack with role-based authentication for operators and administrators.',
    },
  },
  {
    id: 'iot-energy',
    category: 'iot',
    title: 'Smart Electricity Monitor',
    subtitle: 'Hardware telemetry & analytics',
    description:
      'IoT telemetry system designed to monitor per-device energy consumption using smart plugs and physical current sensors.',
    tech: ['IoT Sensors', 'Node.js', 'Express', 'WebSockets'],
    icon: Activity,
    highlight: 'Live hardware telemetry',
    deepDive: {
      problem: 'Lack of granular power visibility leading to phantom energy loss.',
      solution:
        'Networked hardware sensors streaming per-second consumption data to a WebSocket server.',
      architecture:
        'Hardware nodes communicating via MQTT/WebSockets to a Node.js backend.',
    },
  },
  {
    id: 'supplier-tracker',
    category: 'web',
    title: 'Supplier Tracker & Platform',
    subtitle: 'Asset & contract ledger',
    description:
      'Modular tracker managing supplier logs, contract renewals, and transactional audit trails for operational platforms.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js'],
    icon: Layers,
    highlight: 'Renewal engine',
    deepDive: {
      problem:
        'Unorganized vendor contracts, leading to missed renewals and complex financial auditing.',
      solution:
        'Unified visual interface with real-time tracking, a notification engine, and transactional history.',
      architecture:
        'React frontend with Context API; Node.js backend for the transaction ledger.',
    },
  },
];

export const expertise = [
  {
    id: 'web',
    index: '01',
    label: 'Full-stack systems',
    summary:
      'MERN applications designed for operational clarity — from scheduling engines to role-based dashboards.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'ai',
    index: '02',
    label: 'AI vision',
    summary:
      'Neural inference pipelines tuned for live image verification, not just notebook demos.',
    tech: ['PyTorch', 'YOLOv6', 'REST APIs'],
  },
  {
    id: 'iot',
    index: '03',
    label: 'IoT engineering',
    summary:
      'Device telemetry and dashboards that turn hardware signals into decisions in real time.',
    tech: ['Sensors', 'WebSockets', 'MQTT'],
  },
];

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'iot', label: 'IoT' },
];
