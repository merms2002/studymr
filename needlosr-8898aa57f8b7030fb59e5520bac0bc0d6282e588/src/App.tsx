import { useState } from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  CheckSquare, 
  Settings, 
  MessageSquare, 
  Files, 
  LogOut, 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  Share2,
  Framer,
  FolderOpen,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

interface TimelineTask {
  id: string;
  label: string;
  progress: number;
  color: string;
  icon?: any;
  start: number; // day index
  duration: number; // span of days
}

interface KanbanTask {
  id: string;
  title: string;
  date: string;
  image?: string;
  team: string[];
  comments?: number;
  attachments?: number;
  category?: string;
}

interface FileItem {
  id: string;
  name: string;
  size: string;
  icon: any;
  color: string;
}

interface FolderItem {
  id: string;
  name: string;
  count: string;
  color: string;
  icon: any;
}

// --- Data ---
const folders: FolderItem[] = [
  { id: 'f1', name: 'Documents', count: '14 files', color: '#8B5CF6', icon: FolderOpen },
  { id: 'f2', name: 'Calculations', count: '45 files', color: '#3B82F6', icon: FolderOpen },
  { id: 'f3', name: 'Estimates', count: '24 files', color: '#22C55E', icon: FolderOpen },
  { id: 'f4', name: 'Briefs', count: '45 files', color: '#F97316', icon: FolderOpen },
];

const recentFiles: FileItem[] = [
  { id: 'rf1', name: 'briefs.doc', size: '5Mb', icon: Files, color: '#8C8C8C' },
  { id: 'rf2', name: 'website.fig', size: '17Mb', icon: Framer, color: '#F97316' },
  { id: 'rf3', name: 'mobile.fig', size: '22Mb', icon: Framer, color: '#3B82F6' },
  { id: 'rf4', name: 'calculations.xls', size: '9Mb', icon: Files, color: '#22C55E' },
  { id: 'rf5', name: 'mobile.fig', size: '22Mb', icon: Framer, color: '#3B82F6' },
  { id: 'rf6', name: 'calculations.xls', size: '8Mb', icon: Files, color: '#22C55E' },
];

const storageData = [
  { name: 'Photos', value: 45, color: '#3B82F6' },
  { name: 'Documents', value: 25, color: '#F97316' },
  { name: 'Sheets', value: 30, color: '#22C55E' },
];

// --- Data ---
const kanbanData: Record<string, KanbanTask[]> = {
  'To Do': [
    { 
      id: 't1', 
      title: '[Company] - Presentation for now clients', 
      date: '17-10 May', 
      team: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'],
    },
    { 
      id: 't2', 
      title: '[Jibby] - Redesign of current homepage and service section', 
      date: '19 May', 
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      team: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'],
    },
    { 
      id: 't3', 
      title: '[Jibby] - Redesign of contact us page', 
      date: '17 May', 
      team: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop'],
    },
  ],
  'In Progress': [
    { 
      id: 'ip1', 
      title: '[Company] - Marketing tips for Instagram & Linkdin', 
      date: '17 May', 
      team: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'],
    },
    { 
      id: 'ip2', 
      title: '[LooLight] - Branding & Ads Design', 
      date: '12-18 May', 
      team: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=50&h=50&fit=crop'],
    },
    { 
      id: 'ip3', 
      title: '[Company] - Youtube series miniatures (light & dark)', 
      date: '18 May', 
      team: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=50&h=50&fit=crop'],
    },
    { 
      id: 'ip4', 
      title: '[PremiumSpot] - Testimonials & Services section design', 
      date: '10 May', 
      team: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop'],
    },
  ],
  'Review': [
    { 
      id: 'r1', 
      title: '[Company] - Marketing tips for Instagram & Linkdin', 
      date: '11-12 May', 
      team: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'],
    },
    { 
      id: 'r2', 
      title: '[Company] - Presentation of the annual activity summary', 
      date: '11 May', 
      team: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'],
    },
    { 
      id: 'r3', 
      title: '[UniTasty] - Social Media campaign creations', 
      date: '15-16 May', 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      team: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'],
    },
  ],
  'Done': [
    { 
      id: 'd1', 
      title: '[TuchJar] - New Landing Page design', 
      date: '5-7 May', 
      team: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'],
    },
    { 
      id: 'd2', 
      title: '[Company] - New Youtube series Key Visual', 
      date: '5-11 May', 
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      team: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'],
    },
    { 
      id: 'd3', 
      title: '[Company] - New YouTube series Key Visual', 
      date: '7-10 May', 
      team: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'],
    },
    { 
      id: 'd4', 
      title: '[Company] - Marketing tips for Instagram & Linkdin', 
      date: '10-12 May', 
      team: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop'],
    },
  ],
};

// --- Data ---
const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'files', label: 'Files', icon: Files },
];

const chartData = [
  { name: 'Apr', value: 30 },
  { name: 'May', value: 35 },
  { name: 'Jun', value: 32 },
  { name: 'Jul', value: 75 }, 
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 65 },
  { name: 'Oct', value: 62 },
  { name: 'Nov', value: 68 },
  { name: 'Dec', value: 65 },
];

const timelineTasks: TimelineTask[] = [
  { id: '1', label: 'Profile', progress: 42, color: '#8B5CF6', start: 4, duration: 4 },
  { id: '2', label: 'Menu', progress: 54, color: '#22C55E', start: 7, duration: 3, icon: CheckSquare },
  { id: '3', label: 'Settings', progress: 20, color: '#3B82F6', start: 12, duration: 4 },
  { id: '4', label: 'Login', progress: 44, color: '#22C55E', start: 0, duration: 3 },
  { id: '5', label: 'Services', progress: 61, color: '#F97316', start: 9, duration: 3 },
  { id: '6', label: 'Testimonials', progress: 45, color: '#8B5CF6', start: 5, duration: 6 },
  { id: '7', label: 'Contact', progress: 41, color: '#F97316', start: 4, duration: 4 },
  { id: '8', label: 'Homepage', progress: 95, color: '#10B981', start: 11, duration: 5 },
  { id: '9', label: 'Our Portfolio', progress: 43, color: '#3B82F6', start: 2, duration: 6 },
];

const calendarDays = Array.from({ length: 15 }, (_, i) => (i + 5).toString().padStart(2, '0'));

// --- Components ---

const Sidebar = ({ activeId, onViewChange }: { activeId: string, onViewChange: (id: string) => void }) => (
  <aside className="w-64 border-r border-[#262626] h-screen sticky top-0 flex flex-col p-6 overflow-y-auto hidden lg:flex">
    <div className="flex items-center gap-3 mb-12">
      <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
        <LayoutDashboard className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-xl tracking-tight">Dashnect</span>
    </div>

    <nav className="flex-1 space-y-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={cn(
            "sidebar-link w-full text-left",
            activeId === item.id && "active"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>

    <div className="pt-6 border-t border-[#262626] mt-auto">
      <button className="sidebar-link w-full text-red-500/80 hover:text-red-500 hover:bg-red-500/5">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  </aside>
);

const Header = ({ title }: { title: string }) => (
  <header className="h-20 border-b border-[#262626] flex items-center justify-between px-8 sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-md z-40">
    <h1 className="text-2xl font-semibold">{title}</h1>
    
    <div className="flex items-center gap-6">
      <div className="relative group hidden sm:block">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8C8C] group-focus-within:text-white transition-colors" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-violet-600 transition-all font-medium"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-[#8C8C8C] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="bg-[#FF6B00] hover:bg-[#E56000] text-white p-2 rounded-xl transition-all shadow-lg shadow-orange-500/20">
          <Plus className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-[#262626]">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop" 
              alt="Profile" 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-600/20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0D0D0D] rounded-full"></div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-sm font-semibold group-hover:text-violet-400 transition-colors">Sophie</span>
            <ChevronDown className="w-4 h-4 text-[#8C8C8C] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const StatCardLarge = ({ icon: Icon, title, subValue, percentage }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="dashboard-card flex-1 flex flex-col justify-between min-w-[280px]"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-violet-600/10 rounded-xl">
        <Icon className="w-6 h-6 text-violet-600" />
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-bold mb-1">{title}</h3>
      <p className="text-sm text-[#8C8C8C]">
        <span className="text-violet-500 font-medium">{percentage}</span> {subValue}
      </p>
    </div>
  </motion.div>
);

const ProgressCard = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="dashboard-card flex-1 min-w-[280px]"
  >
    <div className="flex items-start gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90">
          <circle 
            cx="48" cy="48" r="40" 
            stroke="currentColor" 
            strokeWidth="8" 
            className="text-[#262626]" 
            fill="transparent" 
          />
          <motion.circle 
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - 0.37) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="48" cy="48" r="40" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeDasharray={2 * Math.PI * 40}
            className="text-orange-500" 
            fill="transparent" 
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold leading-none">45</span>
          <span className="text-[10px] text-[#8C8C8C] font-medium">/121</span>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-lg leading-tight">You completed over <span className="text-orange-500">37%</span> tasks. <span className="text-[#8C8C8C] font-normal block mt-1">Keep it up!</span></h4>
      </div>
    </div>
  </motion.div>
);

const SmallStatCard = ({ icon: Icon, title, count, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="dashboard-card flex flex-col justify-center items-center gap-3 p-4 w-40 shrink-0"
  >
    <div className="p-2 bg-[#1A1A1A] rounded-lg">
      <Icon className="w-5 h-5 text-white/70" />
    </div>
    <div className="text-center">
      <h5 className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8C8C]">{title}</h5>
      <p className="text-sm font-bold">{count}</p>
    </div>
  </motion.div>
);

const TasksChart = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3 }}
    className="dashboard-card relative overflow-hidden h-full flex flex-col min-w-0"
  >
    <div className="flex items-center justify-between mb-8 shrink-0">
      <h3 className="font-semibold text-lg">Tasks Done</h3>
      <div className="flex gap-4">
        {['1d', '1w', '1m', '1y'].map((period) => (
          <button 
            key={period}
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-md transition-colors",
              period === '1m' ? "text-white bg-[#262626]" : "text-[#8C8C8C] hover:text-white"
            )}
          >
            {period}
          </button>
        ))}
      </div>
    </div>

    <div className="flex-1 min-h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#8C8C8C', fontSize: 10, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#8C8C8C', fontSize: 10, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '12px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#8B5CF6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    
    <div className="absolute top-[42%] left-[48%] bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-violet-400/30">
      75 Done
    </div>
  </motion.div>
);

const ProjectCard = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    className="dashboard-card h-full flex flex-col justify-between"
  >
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[#8C8C8C] font-semibold">April 21, 2021</span>
        <button className="text-[#8C8C8C] hover:text-white transition-colors">
          <Plus className="w-5 h-5 rotate-45" />
        </button>
      </div>
      <h3 className="text-2xl font-bold mb-1">Mobile app</h3>
      <p className="text-sm text-[#8C8C8C] mb-8">Cryptocurrency</p>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Progress</span>
          <span className="text-sm font-bold">50%</span>
        </div>
        <div className="h-1.5 bg-[#262626] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-full bg-orange-500 rounded-full" 
          />
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between mt-auto">
      <div className="flex -space-x-3">
        {[
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50&h=50&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=50&h=50&auto=format&fit=crop"
        ].map((src, i) => (
          <img key={i} src={src} alt="Team" className="w-8 h-8 rounded-full border-2 border-[#141414] object-cover ring-2 ring-transparent hover:ring-violet-500 transition-all cursor-pointer" referrerPolicy="no-referrer" />
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-[#141414] bg-[#262626] flex items-center justify-center text-[10px] font-bold text-[#8C8C8C] transition-colors cursor-pointer hover:text-white">+2</div>
      </div>
      <span className="text-xs font-bold text-[#8C8C8C]">3 weeks left</span>
    </div>
  </motion.div>
);

const TasksView = () => (
  <div className="flex-1 p-8 overflow-auto scrollbar-custom">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 items-start">
      {Object.entries(kanbanData).map(([column, tasks], columnIndex) => (
        <div key={column} className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                column === 'To Do' && "bg-blue-500",
                column === 'In Progress' && "bg-orange-500",
                column === 'Review' && "bg-violet-500",
                column === 'Done' && "bg-green-500"
              )}
            />
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C]">{column}</h3>
          </div>

          <div className="space-y-4">
            {tasks.map((task, taskIndex) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (columnIndex * 0.1) + (taskIndex * 0.05) }}
                key={task.id}
                className="dashboard-card p-5 group cursor-grab active:cursor-grabbing hover:border-violet-500/50 hover:bg-[#1A1A1A]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3 text-[#8C8C8C]">
                  <span className="text-[10px] font-bold">{task.date}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                </div>
                
                <h4 className="text-sm font-semibold mb-4 leading-relaxed group-hover:text-violet-400 transition-colors">
                  {task.title}
                </h4>

                {task.image && (
                  <div className="mb-4 rounded-xl overflow-hidden aspect-[4/3] border border-[#262626]">
                    <img 
                      src={task.image} 
                      alt={task.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
                  <div className="flex -space-x-2">
                    {task.team.map((avatar, i) => (
                      <img 
                        key={i} 
                        src={avatar} 
                        alt="Member" 
                        className="w-6 h-6 rounded-full border-2 border-[#141414] object-cover ring-1 ring-transparent group-hover:ring-violet-500/30 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-[#4D4D4D] hover:text-white transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-[#4D4D4D] hover:text-white transition-colors">
                      <Files className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <button className="w-full py-4 border-2 border-dashed border-[#262626] rounded-2xl flex items-center justify-center text-[#4D4D4D] hover:border-violet-500/30 hover:text-violet-400/70 transition-all group">
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FilesView = () => (
  <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-4 gap-8 overflow-y-auto scrollbar-custom max-w-[1600px]">
    <div className="xl:col-span-3 space-y-8">
      {/* Top Buttons */}
      <div className="flex items-center gap-4">
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-violet-600/20">
          <FolderOpen className="w-4 h-4" />
          Create New Folder
        </button>
        <button className="text-[#8C8C8C] hover:text-white px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
          <Share2 className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Quick Access */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C8C8C] mb-6">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <motion.div 
              whileHover={{ y: -4 }}
              key={folder.id} 
              className="dashboard-card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-2.5 rounded-xl bg-opacity-10"
                  style={{ backgroundColor: `${folder.color}20`, color: folder.color }}
                >
                  <folder.icon className="w-6 h-6" />
                </div>
                <button className="p-1 text-[#4D4D4D] hover:text-white transition-colors">
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              <h4 className="font-semibold text-sm mb-1">{folder.name}</h4>
              <span className="text-[10px] text-[#4D4D4D] font-bold">{folder.count}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Files */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C8C8C]">Recent Files</h3>
          <button className="text-[#4D4D4D] hover:text-white">
            <Plus className="w-5 h-5 -rotate-90" />
          </button>
        </div>
        <div className="dashboard-card p-0 overflow-hidden">
          {recentFiles.map((file, i) => (
            <div 
              key={file.id} 
              className={cn(
                "flex items-center justify-between p-4 hover:bg-[#1A1A1A]/30 transition-colors cursor-pointer",
                i !== recentFiles.length - 1 && "border-b border-[#262626]"
              )}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="p-2 rounded-lg bg-opacity-10"
                  style={{ backgroundColor: `${file.color}20`, color: file.color }}
                >
                  <file.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-xs font-bold text-[#4D4D4D]">{file.size}</span>
                <button className="p-1 text-[#4D4D4D] hover:text-white transition-colors">
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Uploading Card */}
      <div className="dashboard-card border-violet-500/30 bg-violet-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
              <Files className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Uploading 1 file</h4>
              <span className="text-[10px] text-[#8C8C8C] font-semibold">Summarizing documents...</span>
            </div>
          </div>
          <span className="text-sm font-bold">56%</span>
        </div>
        <div className="h-1.5 bg-[#262626] rounded-full overflow-hidden">
          <div className="h-full bg-violet-600 w-[56%] rounded-full" />
        </div>
      </div>
    </div>

    {/* Sidebar Storage */}
    <div className="xl:col-span-1 space-y-8">
      <div className="dashboard-card">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C8C8C] mb-8">Storage Stats</h3>
        
        <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            {/* Background */}
            <circle cx="96" cy="96" r="70" stroke="#262626" strokeWidth="12" fill="transparent" />
            {/* Segments */}
            <circle cx="96" cy="96" r="70" stroke="#3B82F6" strokeWidth="12" strokeDasharray="440" strokeDashoffset="110" fill="transparent" strokeLinecap="round" />
            <circle cx="96" cy="96" r="70" stroke="#F97316" strokeWidth="12" strokeDasharray="440" strokeDashoffset="280" fill="transparent" strokeLinecap="round" />
            <circle cx="96" cy="96" r="70" stroke="#22C55E" strokeWidth="12" strokeDasharray="440" strokeDashoffset="380" fill="transparent" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">53%</span>
            <span className="text-[10px] text-[#4D4D4D] font-bold">USED</span>
          </div>
        </div>

        <div className="flex gap-2 h-20 items-end justify-center mb-8">
          {[40, 70, 45, 90, 60].map((h, i) => (
            <div key={i} className="flex-1 bg-[#262626] rounded-t-sm relative group overflow-hidden">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="absolute bottom-0 left-0 right-0 bg-violet-600/50 group-hover:bg-violet-500 transition-colors"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {storageData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-[#8C8C8C]">{item.name}</span>
              </div>
              <span className="text-xs font-bold">{item.value}%</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-[#262626] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#4D4D4D] font-bold uppercase tracking-widest mb-1">Available Space</p>
            <h4 className="text-xl font-bold">75GB</h4>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin-slow" />
        </div>
      </div>
    </div>
  </div>
);

const TimelineView = () => (
  <div className="flex-1 p-8 space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&h=100&auto=format&fit=crop" 
            alt="Project" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">Jibby Redesign</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-[#8C8C8C] tracking-wider">UI Design</span>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-[#262626] hover:bg-white/5 transition-colors">
          <Share2 className="w-4 h-4" />
          Invite
        </button>
        <div className="flex -space-x-3">
          {[
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=50&h=50&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=50&h=50&auto=format&fit=crop"
          ].map((src, i) => (
            <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-[#0D0D0D] object-cover" referrerPolicy="no-referrer" alt="User" />
          ))}
        </div>
      </div>
    </div>

    <div className="dashboard-card p-0 overflow-hidden flex flex-col h-[600px]">
      <div className="flex items-center justify-between p-6 border-b border-[#262626]">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">May 2021</span>
          <div className="flex gap-2">
            <button className="p-1 hover:text-white text-[#8C8C8C] transition-colors"><ChevronDown className="w-4 h-4 rotate-90" /></button>
            <button className="p-1 hover:text-white text-[#8C8C8C] transition-colors"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8C8C8C] font-semibold">Sort by:</span>
          <button className="flex items-center gap-2 text-xs font-bold bg-[#1A1A1A] px-3 py-1.5 rounded-lg">
            Day
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-auto relative scrollbar-custom">
        {/* Left Column Labels */}
        <div className="w-48 sticky left-0 z-20 bg-[#141414] border-r border-[#262626]">
          <div className="h-12 border-b border-[#262626] flex items-center px-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#4D4D4D]">Stages</span>
          </div>
          {timelineTasks.map((task) => (
            <div key={task.id} className="h-14 border-b border-[#262626] flex items-center px-6 gap-3 group">
              <div 
                className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" 
                style={{ backgroundColor: task.color }}
              ></div>
              <span className="text-xs font-medium text-[#8C8C8C] group-hover:text-white transition-colors">{task.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline Grid */}
        <div className="flex-1">
          <div className="flex sticky top-0 z-10 bg-[#141414]">
            {calendarDays.map((day, i) => (
              <div 
                key={day} 
                className={cn(
                  "w-16 h-12 border-b border-r border-[#262626] flex items-center justify-center text-[10px] font-bold text-[#4D4D4D]",
                  day === '12' && "bg-violet-600/20 text-violet-400"
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Grid Background Lines */}
            <div className="absolute inset-0 flex pointer-events-none">
              {calendarDays.map((day) => (
                <div key={day} className="w-16 h-full border-r border-[#262626]/40"></div>
              ))}
            </div>

            {/* Task Rows */}
            {timelineTasks.map((task, i) => (
              <div key={task.id} className="h-14 border-b border-[#262626] flex items-center relative px-2">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="h-10 rounded-full flex items-center pl-4 pr-1 gap-2 absolute z-10 shadow-lg"
                  style={{ 
                    backgroundColor: task.color,
                    left: `${task.start * 4 + 0.5}rem`,
                    width: `${task.duration * 4 - 0.5}rem`
                  }}
                >
                  {task.icon && <task.icon className="w-3.5 h-3.5 text-white/90" />}
                  <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                    {task.label}
                  </span>
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5 text-[9px] font-bold text-white">
                    {task.progress}%
                  </div>
                  <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OverviewView = () => (
  <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-700 max-w-[1600px]">
    {/* Header Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="md:col-span-1 xl:col-span-2">
        <h2 className="text-[#8C8C8C] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Tasks</h2>
      </div>
      <div className="md:col-span-1 xl:col-span-2">
        <h2 className="text-[#8C8C8C] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Current Project</h2>
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCardLarge 
        icon={Share2} 
        title="718+" 
        subValue="than last year" 
        percentage="+11% more" 
      />
      <ProgressCard />
      <SmallStatCard icon={Files} title="Company files" count="57 files" delay={0.2} />
      <SmallStatCard icon={Framer} title="Dribbble assets" count="23 files" delay={0.3} />
    </div>

    {/* Grid Content */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <TasksChart />
      </div>
      <div className="xl:col-span-1">
        <ProjectCard />
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      <Sidebar activeId={activeTab} onViewChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header title={menuItems.find(i => i.id === activeTab)?.label || 'Overview'} />
        
        {activeTab === 'overview' ? <OverviewView /> : null}
        {activeTab === 'timeline' ? <TimelineView /> : null}
        {activeTab === 'tasks' ? <TasksView /> : null}
        {activeTab === 'files' ? <FilesView /> : null}
        {activeTab !== 'overview' && activeTab !== 'timeline' && activeTab !== 'tasks' && activeTab !== 'files' ? (
          <div className="flex-1 flex items-center justify-center text-[#4D4D4D] text-sm italic">
            This module is coming soon...
          </div>
        ) : null}
      </main>
    </div>
  );
}
