import { 
  ScanEye, 
  Zap, 
  Cpu, 
  Globe, 
  Activity, 
  Layers 
} from 'lucide-react';

export const person = {
  name: 'Justin James Alviar',
  firstName: 'Justin',
  role: 'Full-stack engineer',
  email: 'justinjamesalviar@gmail.com',
  location: 'Remote',
};

export const projects = [
  {
    id: 'verifai',
    title: 'VerifAI Image Verification',
    subtitle: 'Machine Learning & Object Detection System',
    category: 'ai',
    highlight: 'MT-YOLOv6 Architecture',
    icon: ScanEye,
    description: 'A neural image-verification pipeline built for real-time manipulation detection and classification.',
    deepDive: {
      problem: 'High volume of synthetic or altered visual data bypasses manual inspection.',
      solution: 'Deployed custom MT-YOLOv6 object detection models to flag anomalies at scale.',
      architecture: 'PyTorch inference backend coupled with a React management dashboard.',
    },
    tech: ['PyTorch', 'MT-YOLOv6', 'React', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/justin20-05/verifai',
    live: 'https://verifai.example.com',
  },
  {
    id: 'iot-energy',
    title: 'IoT Electricity Monitor',
    subtitle: 'Hardware-to-Web Telemetry Suite',
    category: 'iot',
    highlight: 'Real-Time Sensor Tracking',
    icon: Zap,
    description: 'System designed to track real-time power consumption per device via smart plugs and sensor networks.',
    deepDive: {
      problem: 'Lack of granular visibility into per-device power consumption.',
      solution: 'Hardware sensor integration feeding real-time metrics directly into a MERN dashboard.',
      architecture: 'Node.js/Express ingestion API, MongoDB time-series storage, WebSocket updates.',
    },
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'IoT Sensors'],
    github: 'https://github.com/justin20-05/iot-electricity-monitor',
    live: 'https://energy-monitor.example.com',
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
    icon: Globe,
  },
  {
    id: 'ai',
    index: '02',
    label: 'AI vision',
    summary:
      'Neural inference pipelines tuned for live image verification, not just notebook demos.',
    tech: ['PyTorch', 'YOLOv6', 'REST APIs'],
    icon: Cpu,
  },
  {
    id: 'iot',
    index: '03',
    label: 'IoT engineering',
    summary:
      'Device telemetry and dashboards that turn hardware signals into decisions in real time.',
    tech: ['Sensors', 'WebSockets', 'MQTT'],
    icon: Activity,
  },
];

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'iot', label: 'IoT' },
];