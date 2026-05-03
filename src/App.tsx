import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2, ArrowLeft, ExternalLink, Plus, Minus, ArrowRight, Newspaper, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

// --- Data Definitions ---
import { Stage, Link, Actor, Project, ProvinceData, PROVINCE_DATA, TOTAL_STATS } from './data';
import { useGoogleNews } from './useGoogleNews';

// --- Helpers ---
const parseInvestment = (investmentStr?: string) => {
  if (!investmentStr) return 0;
  let val = parseFloat(investmentStr.replace(/[^0-9.]/g, ''));
  if (investmentStr.includes('M')) return val * 1000000;
  if (investmentStr.includes('K')) return val * 1000;
  return val;
};

const investmentData = Object.values(PROVINCE_DATA)
  .map(prov => ({
    name: prov.name,
    id: prov.id,
    investment: parseInvestment(prov.totalInvestment),
    investmentStr: prov.totalInvestment || 'N/A'
  }))
  .filter(d => d.investment > 0)
  .sort((a, b) => b.investment - a.investment);


// --- Components ---

const BrutalistCard = ({ children, className = "", title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={`brutal-border bg-cannis-cream brutal-shadow p-4 sm:p-6 mb-6 ${className}`}>
    {title && (
      <h3 className="font-serif font-black text-lg sm:text-xl uppercase tracking-tight border-b-2 border-cannis-ink pb-2 mb-4 text-cannis-ink">
        {title}
      </h3>
    )}
    {children}
  </div>
);

const Badge = ({ children, colorClass = "bg-cannis-ink text-cannis-cream" }: { children: React.ReactNode, colorClass?: string }) => (
  <span className={`inline-flex items-center px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider brutal-border font-sans ${colorClass}`}>
    {children}
  </span>
);

const BrutalistAccordion = ({ title, badge, children, defaultOpen = false }: { title: string, badge?: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="brutal-border bg-cannis-cream mb-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-cannis-ivory hover:bg-cannis-olive-light hover:text-cannis-cream transition-colors text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif font-black text-lg sm:text-xl uppercase">{title}</span>
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-cannis-ink text-cannis-cream px-2 py-1 group-hover:bg-cannis-cream group-hover:text-cannis-ink transition-colors font-sans">
              {badge}
            </span>
          )}
        </div>
        <div className="border-2 border-current p-1">
          {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 border-t-2 border-cannis-ink">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedProvId, setSelectedProvId] = useState<string | null>(null);
  const [hoveredProvId, setHoveredProvId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [actorFilter, setActorFilter] = useState<string>('Todos');
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedData = selectedProvId ? PROVINCE_DATA[selectedProvId] : null;

const maxInvestment = investmentData.length ? Math.max(...investmentData.map(d => d.investment)) : 1;

  // Google News Hooks
  const { news: nationalNews, loading: nationalLoading } = useGoogleNews('cannabis industria argentina');
  const { news: localNews, loading: localLoading } = useGoogleNews(selectedData ? `cannabis industria ${selectedData.name} argentina` : '');

  // Fetch GeoJSON
  useEffect(() => {
    setActorFilter('Todos');
  }, [selectedProvId]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/nachios/ArgentinaProvincias/master/provincias-argentina.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading GeoJSON:", err));
  }, []);

  // Resize Observer for Map Container
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setMapDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // D3 Map Rendering
  useEffect(() => {
    if (!geoData || !svgRef.current || mapDimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const padding = 30;
    const projection = d3.geoMercator()
      .fitExtent([[padding, padding], [mapDimensions.width - padding, mapDimensions.height - padding]], geoData);

    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append("g");

    // Colors: Vanilla var(--color-cannis-cream), Olive var(--color-cannis-olive), Eggplant var(--color-cannis-olive-light), Ink var(--color-cannis-ink)
    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", (d: any) => {
        const name = d.properties.name;
        if (selectedProvId === name) return "var(--color-cannis-olive)"; // Olive for selected
        return PROVINCE_DATA[name] ? "var(--color-cannis-ivory)" : "#DCD7CD"; // Light vanilla for data, darker for no data
      })
      .attr("stroke", "var(--color-cannis-ink)")
      .attr("stroke-width", (d: any) => selectedProvId === d.properties.name ? 2 : 1)
      .attr("class", (d: any) => PROVINCE_DATA[d.properties.name] ? "cursor-pointer transition-colors duration-200" : "transition-colors duration-200")
      .on("mouseover", (event, d: any) => {
        const name = d.properties.name;
        if (PROVINCE_DATA[name]) {
          setHoveredProvId(name);
          if (selectedProvId !== name) {
            d3.select(event.currentTarget).attr("fill", "var(--color-cannis-olive-light)"); // Eggplant on hover
          }
        }
      })
      .on("mousemove", (event) => {
        setTooltipPos({ x: event.clientX, y: event.clientY });
      })
      .on("mouseout", (event, d: any) => {
        const name = d.properties.name;
        setHoveredProvId(null);
        if (PROVINCE_DATA[name] && selectedProvId !== name) {
          d3.select(event.currentTarget).attr("fill", "var(--color-cannis-ivory)");
        }
      })
      .on("click", (event, d: any) => {
        const name = d.properties.name;
        if (PROVINCE_DATA[name]) {
          setSelectedProvId(prev => {
            if (prev === name) {
              setIsPanelExpanded(false);
              return null;
            }
            return name;
          });
        }
      });

    // Drop shadow effect for selected province (brutalist style)
    g.selectAll("path.shadow")
      .data(geoData.features.filter((d: any) => d.properties.name === selectedProvId))
      .enter()
      .insert("path", "path")
      .attr("d", pathGenerator as any)
      .attr("fill", "var(--color-cannis-ink)")
      .attr("transform", "translate(4, 4)")
      .attr("class", "pointer-events-none");

    const centroids = geoData.features
      .filter((d: any) => PROVINCE_DATA[d.properties.name])
      .map((d: any) => {
        const centroid = pathGenerator.centroid(d);
        return { name: d.properties.name, x: centroid[0], y: centroid[1] };
      });

    g.selectAll("circle")
      .data(centroids)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .attr("r", 5)
      .attr("fill", (d: any) => selectedProvId === d.name ? "var(--color-cannis-cream)" : "var(--color-cannis-ink)")
      .attr("stroke", "var(--color-cannis-ink)")
      .attr("stroke-width", 2)
      .attr("class", "pointer-events-none");

  }, [geoData, selectedProvId, mapDimensions]);

  const hoveredData = hoveredProvId ? PROVINCE_DATA[hoveredProvId] : null;

  const actorTypes = selectedData 
    ? ['Todos', ...Array.from(new Set(selectedData.mainActors.map(a => a.type)))] 
    : ['Todos'];
  
  const filteredActors = selectedData 
    ? [...selectedData.mainActors]
        .filter(a => actorFilter === 'Todos' || a.type === actorFilter)
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-cannis-cream text-cannis-ink font-sans selection:bg-cannis-olive-light selection:text-cannis-cream overflow-hidden">
      
      {/* Brutalist Header */}
      <header className="flex-shrink-0 border-b-4 border-cannis-ink bg-cannis-cream z-20 flex flex-col sm:flex-row justify-between items-stretch relative">
        <div className="p-4 sm:p-6 border-b-4 sm:border-b-0 sm:border-r-4 border-cannis-ink flex-1">
          <h1 className="font-serif font-black text-5xl sm:text-6xl tracking-tighter uppercase leading-none mb-2">CANNIS</h1>
          <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-widest">Ecosistema Regulatorio Argentina</p>
        </div>
        <div className="flex">
          <div className="p-4 sm:p-6 border-r-4 border-cannis-ink flex flex-col justify-center items-center bg-cannis-olive text-cannis-cream">
            <span className="text-3xl sm:text-4xl font-black leading-none">{TOTAL_STATS.actors}</span>
            <span className="uppercase font-bold text-[10px] sm:text-xs tracking-widest mt-1 font-sans">Actores</span>
          </div>
          <div className="p-4 sm:p-6 flex flex-col justify-center items-center bg-cannis-olive-light text-cannis-cream">
            <span className="text-3xl sm:text-4xl font-black leading-none">{Object.keys(PROVINCE_DATA).length}</span>
            <span className="uppercase font-bold text-[10px] sm:text-xs tracking-widest mt-1 font-sans">Provincias</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Map Area */}
        <motion.div 
          layout
          initial={false}
          animate={{ opacity: isPanelExpanded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={`relative border-cannis-ink bg-cannis-cream flex-shrink-0 overflow-hidden 
            ${isPanelExpanded ? 'h-0 md:h-full md:w-0 md:border-none' : 'h-[40%] md:h-full w-full md:w-[45%] lg:w-[50%] border-b-4 md:border-b-0 md:border-r-4'}
          `}
        >
          <div className="absolute inset-0 w-full h-full" ref={containerRef}>
            {/* Map Grid Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-cannis-ink) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <svg ref={svgRef} className="w-full h-full relative z-10" />
            
            {/* Tooltip */}
            {hoveredData && !isPanelExpanded && (
              <div 
                className="fixed pointer-events-none brutal-border bg-cannis-cream brutal-shadow px-3 py-2 z-50 transform -translate-x-1/2 -translate-y-full mt-[-15px]"
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                <div className="font-serif font-black text-lg uppercase">{hoveredData.name}</div>
                <div className="font-sans font-bold text-[10px] text-cannis-olive uppercase tracking-wider">{hoveredData.stage}</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Panel - Dashboard */}
        <motion.div 
          layout
          className={`bg-cannis-ivory overflow-y-auto flex-1 scroll-smooth relative 
            ${isPanelExpanded ? 'h-full w-full' : 'md:h-full w-full md:w-[55%] lg:w-[50%]'}
          `}
        >
          {selectedData ? (
            <div className="p-4 sm:p-8 pb-12 w-full max-w-5xl mx-auto">
              
              {/* Controls */}
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-cannis-ivory z-20 py-2 border-b-2 border-cannis-ink md:border-none md:py-0 md:bg-transparent">
                <button 
                  onClick={() => {
                    setSelectedProvId(null);
                    setIsPanelExpanded(false);
                  }}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest brutal-border px-3 py-2 bg-cannis-cream brutal-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-cannis-ink hover:text-cannis-cream font-sans"
                >
                  <ArrowLeft size={16} /> Volver
                </button>

                <button 
                  onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                  className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest brutal-border px-3 py-2 bg-cannis-cream brutal-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-cannis-ink hover:text-cannis-cream font-sans"
                >
                  {isPanelExpanded ? <><Minimize2 size={16} /> Contraer</> : <><Maximize2 size={16} /> Expandir</>}
                </button>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={selectedData.id}
              >
                {/* Title Card */}
                <motion.div variants={itemVariants} className="brutal-border-thick bg-cannis-cream brutal-shadow-lg mb-8 overflow-hidden">
                  <div className="relative h-48 sm:h-64 w-full border-b-4 border-cannis-ink">
                    <img 
                      src={`https://picsum.photos/seed/${selectedData.id.replace(/\s+/g, '')}/800/400?grayscale`} 
                      alt={`Vista de ${selectedData.name}`}
                      className="w-full h-full object-cover mix-blend-multiply contrast-125 sepia-[.3] opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-cannis-olive-light/20 mix-blend-overlay"></div>
                    <div className="absolute bottom-0 left-0 bg-cannis-ink text-cannis-cream px-3 py-1 font-mono text-xs font-bold tracking-widest">
                      ARCHIVO_REF: {selectedData.id.substring(0, 3).toUpperCase()}-{new Date().getFullYear()}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge colorClass="bg-cannis-olive text-cannis-cream">{selectedData.stage}</Badge>
                      {selectedData.totalInvestment && (
                        <Badge colorClass="bg-cannis-cream text-cannis-ink">Inversión: {selectedData.totalInvestment}</Badge>
                      )}
                    </div>
                    <h2 className="font-serif font-black text-5xl sm:text-7xl uppercase tracking-tighter leading-none mb-6 text-cannis-ink">
                      {selectedData.name}
                    </h2>
                    {selectedData.description && (
                      <p className="text-lg sm:text-xl font-medium leading-snug border-l-4 border-cannis-olive-light pl-4">
                        {selectedData.description}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Terminal Financiera / Economía */}
                <motion.div variants={itemVariants} className="mb-8 brutal-border brutal-shadow bg-cannis-ink text-cannis-cream p-4 sm:p-6 font-mono relative overflow-hidden">
                  {/* Scanline effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-10"></div>
                  
                  <div className="flex justify-between items-center border-b-2 border-cannis-olive-light pb-2 mb-4">
                    <div className="text-cannis-olive-light font-bold tracking-widest text-sm sm:text-base">
                      &gt; TERMINAL_ECONOMICA // {selectedData.id.toUpperCase()}
                    </div>
                    <div className="text-xs animate-pulse">● LIVE</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <div className="text-[10px] sm:text-xs text-cannis-olive-light mb-1">DATA.INVERSION_TOTAL</div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-cannis-cream">
                        {selectedData.totalInvestment || "N/A"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] sm:text-xs text-cannis-olive-light mb-1">DATA.MARCO_LEGAL</div>
                      <div className="text-sm sm:text-base leading-snug">
                        {selectedData.legalProjection}
                      </div>
                      <div className="mt-2 text-xs bg-cannis-olive-light text-cannis-ink inline-block px-2 py-1 font-bold">
                        BASE: {selectedData.framework}
                      </div>
                    </div>

                    <div className="md:col-span-2 border-t border-cannis-olive-light/30 pt-4">
                      <div className="text-[10px] sm:text-xs text-cannis-olive-light mb-1">DATA.PROYECCION_COMERCIAL</div>
                      <div className="text-sm sm:text-base leading-relaxed">
                        {selectedData.commercialProjection}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={itemVariants}>
                  <BrutalistCard title="Ecosistema Activo">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="brutal-border p-4 text-center bg-cannis-ivory hover:bg-cannis-ink hover:text-cannis-cream transition-colors">
                        <div className="font-black text-4xl">{selectedData.actors}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest mt-2 font-sans">Actores</div>
                      </div>
                      <div className="brutal-border p-4 text-center bg-cannis-ivory hover:bg-cannis-ink hover:text-cannis-cream transition-colors">
                        <div className="font-black text-4xl">{selectedData.smes}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest mt-2 font-sans">PyMEs</div>
                      </div>
                      <div className="brutal-border p-4 text-center bg-cannis-ivory hover:bg-cannis-ink hover:text-cannis-cream transition-colors">
                        <div className="font-black text-4xl">{selectedData.rd}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest mt-2 font-sans">I+D</div>
                      </div>
                      <div className="brutal-border p-4 text-center bg-cannis-ivory hover:bg-cannis-ink hover:text-cannis-cream transition-colors">
                        <div className="font-black text-4xl">{selectedData.ngos}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest mt-2 font-sans">ONGs</div>
                      </div>
                    </div>
                  </BrutalistCard>
                </motion.div>

                {/* Investment BarChart */}
                <motion.div variants={itemVariants}>
                  <BrutalistCard title="Ranking de Inversiones (Mapa de Calor)" className="overflow-hidden">
                    <div className="h-64 sm:h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={investmentData}
                          layout="vertical"
                          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-cannis-olive-light)" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-cannis-ink)', fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 11 }}
                            width={100}
                          />
                          <RechartsTooltip 
                            cursor={{ fill: 'var(--color-cannis-olive-light)', opacity: 0.2 }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-cannis-ivory brutal-border p-2 brutal-shadow-sm font-mono text-xs z-50 relative pointer-events-none">
                                    <div className="font-bold">{payload[0].payload.name}</div>
                                    <div className="text-cannis-ink mt-1 opacity-80 font-bold">Inversión:</div>
                                    <div className="font-bold text-sm tracking-tight">{payload[0].payload.investmentStr}</div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar 
                            dataKey="investment" 
                            className="cursor-pointer transition-all duration-300" 
                            onClick={(data) => setSelectedProvId(data.id === selectedProvId ? null : data.id)}
                          >
                            {investmentData.map((entry, index) => {
                              const ratio = maxInvestment > 0 ? entry.investment / maxInvestment : 0.1;
                              let fill = 'var(--color-cannis-olive-light)';
                              if (entry.id === selectedProvId) fill = 'var(--color-cannis-ivory)';
                              else if (ratio >= 0.7) fill = 'var(--color-cannis-ink)';
                              else if (ratio >= 0.4) fill = '#3f4a29';
                              else if (ratio >= 0.15) fill = 'var(--color-cannis-olive)';
                              else fill = '#d8dbcb';
                              
                              const isSelected = entry.id === selectedProvId;
                              
                              return (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={fill} 
                                  stroke="var(--color-cannis-ink)" 
                                  strokeWidth={isSelected ? 3 : 2}
                                />
                              );
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </BrutalistCard>
                </motion.div>

                {/* Actors & Projects Grid (Side by side if expanded) */}
                <div className={`grid grid-cols-1 ${isPanelExpanded ? 'lg:grid-cols-2 gap-8' : 'gap-0'}`}>
                  
                  {/* Actors */}
                  {selectedData.mainActors.length > 0 && (
                    <motion.div variants={itemVariants}>
                      <h3 className="font-serif font-black text-2xl uppercase tracking-tight border-b-4 border-cannis-ink pb-2 mb-4 text-cannis-ink">
                        Actores Clave
                      </h3>
                      
                      {/* Actor Filter */}
                      {actorTypes.length > 1 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {actorTypes.map(type => (
                            <button
                              key={type}
                              onClick={() => setActorFilter(type)}
                              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 brutal-border transition-colors font-sans ${
                                actorFilter === type 
                                  ? 'bg-cannis-ink text-cannis-cream' 
                                  : 'bg-cannis-cream text-cannis-ink hover:bg-cannis-ivory'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="space-y-4">
                        {filteredActors.length > 0 ? (
                          filteredActors.map((actor, idx) => (
                            <BrutalistAccordion key={idx} title={actor.name} badge={actor.type} defaultOpen={idx === 0}>
                              {actor.desc && <p className="text-base font-medium mb-4 leading-relaxed">{actor.desc}</p>}
                              <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t-2 border-cannis-ink border-dashed">
                                {actor.investment && (
                                  <span className="text-xs font-bold uppercase bg-cannis-olive text-cannis-cream px-3 py-1.5 brutal-border font-sans">
                                    Fondos: {actor.investment}
                                  </span>
                                )}
                                {actor.links?.map((link, lIdx) => (
                                  <a 
                                    key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase bg-cannis-cream text-cannis-ink px-3 py-1.5 brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-sans"
                                  >
                                    {link.label} <ExternalLink size={14} strokeWidth={3} />
                                  </a>
                                ))}
                              </div>
                            </BrutalistAccordion>
                          ))
                        ) : (
                          <div className="p-4 brutal-border border-dashed text-center font-bold text-sm uppercase text-gray-500 font-sans">
                            No hay actores de este tipo
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* R&D Projects */}
                  {selectedData.rdProjects && selectedData.rdProjects.length > 0 && (
                    <motion.div variants={itemVariants} className={isPanelExpanded ? '' : 'mt-8'}>
                      <h3 className="font-serif font-black text-2xl uppercase tracking-tight border-b-4 border-cannis-ink pb-2 mb-6 text-cannis-ink">
                        Proyectos I+D Destacados
                      </h3>
                      <div className="space-y-4">
                        {selectedData.rdProjects.map((proj, idx) => (
                          <BrutalistAccordion key={idx} title={proj.name} badge={proj.status}>
                            {proj.desc && <p className="text-base font-medium mb-4 leading-relaxed">{proj.desc}</p>}
                            {proj.budget && (
                              <div className="mt-4 pt-4 border-t-2 border-cannis-ink border-dashed">
                                <span className="text-xs font-bold uppercase bg-cannis-olive-light text-cannis-cream px-3 py-1.5 brutal-border font-sans">
                                  Presupuesto: {proj.budget}
                                </span>
                              </div>
                            )}
                          </BrutalistAccordion>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Local News Section */}
                <motion.div variants={itemVariants} className="mt-12">
                  <BrutalistCard title="Noticias Locales Destacadas" className="!bg-cannis-ivory">
                    {localLoading ? (
                      <div className="flex justify-center items-center p-8">
                        <Loader2 className="animate-spin text-cannis-ink" size={32} />
                      </div>
                    ) : localNews && localNews.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {localNews.map((news) => (
                          <a 
                            key={news.id} 
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block brutal-border bg-cannis-cream p-4 hover:bg-cannis-ink hover:text-cannis-cream transition-colors brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                  <Newspaper size={14} className="group-hover:text-cannis-cream" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider bg-cannis-olive-light text-cannis-cream px-2 py-0.5 border border-cannis-ink truncate max-w-[120px] font-sans">
                                    {news.source}
                                  </span>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-400 font-sans">
                                    {news.date}
                                  </span>
                                </div>
                                <h4 className="font-serif font-bold text-sm sm:text-base leading-tight line-clamp-3">
                                  {news.title}
                                </h4>
                              </div>
                              <ExternalLink size={16} className="flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 brutal-border border-dashed text-center font-bold text-sm uppercase text-gray-500 font-sans">
                        No se encontraron noticias recientes
                      </div>
                    )}
                  </BrutalistCard>
                </motion.div>

              </motion.div>
            </div>
          ) : (
            <div className="min-h-full flex flex-col p-4 sm:p-8 py-12 max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="brutal-border-thick bg-cannis-cream brutal-shadow-lg p-8 sm:p-12 mb-12"
              >
                <h2 className="font-serif font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-6 leading-none">
                  Bienvenido a CANNIS
                </h2>
                <p className="text-xl font-medium leading-snug mb-6 border-l-4 border-cannis-ink pl-4">
                  El primer mapa interactivo que rastrea el ecosistema de inversiones, actores privados, públicos y ONGs en la industria del cannabis en Argentina.
                </p>
                <p className="text-lg font-medium leading-snug opacity-80">
                  Selecciona una provincia en el mapa para explorar el estado de su marco regulatorio, proyecciones comerciales y descubrir los proyectos de inversión e I+D más destacados.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border-l-8 border-cannis-olive pl-6 mb-12"
              >
                <p className="font-serif font-bold text-3xl sm:text-4xl uppercase tracking-tight leading-none text-cannis-ink">
                  "El ecosistema transita de un modelo de investigación a uno de desarrollo productivo y exportación."
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Panorama Nacional */}
                <BrutalistCard title="Panorama Nacional">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="brutal-border p-6 bg-cannis-cream hover:bg-cannis-olive hover:text-cannis-cream transition-colors group">
                      <div className="font-black text-5xl sm:text-6xl text-cannis-olive group-hover:text-cannis-cream mb-2 transition-colors">{TOTAL_STATS.actors}</div>
                      <div className="font-bold text-sm uppercase tracking-widest border-t-2 border-cannis-ink group-hover:border-cannis-cream pt-2 transition-colors font-sans">Entidades Activas</div>
                    </div>
                    <div className="brutal-border p-6 bg-cannis-cream hover:bg-cannis-olive-light hover:text-cannis-cream transition-colors group">
                      <div className="font-black text-5xl sm:text-6xl text-cannis-olive-light group-hover:text-cannis-cream mb-2 transition-colors">{TOTAL_STATS.rd}</div>
                      <div className="font-bold text-sm uppercase tracking-widest border-t-2 border-cannis-ink group-hover:border-cannis-cream pt-2 transition-colors font-sans">Centros I+D</div>
                    </div>
                    <div className="brutal-border p-6 bg-cannis-cream hover:bg-cannis-ink hover:text-cannis-cream transition-colors group">
                      <div className="font-black text-5xl sm:text-6xl text-cannis-ink group-hover:text-cannis-cream mb-2 transition-colors">{TOTAL_STATS.smes}</div>
                      <div className="font-bold text-sm uppercase tracking-widest border-t-2 border-cannis-ink group-hover:border-cannis-cream pt-2 transition-colors font-sans">PyMEs & Empresas</div>
                    </div>
                    <div className="brutal-border p-6 bg-cannis-cream hover:bg-cannis-ink hover:text-cannis-cream transition-colors group">
                      <div className="font-black text-5xl sm:text-6xl text-cannis-ink group-hover:text-cannis-cream mb-2 transition-colors">{TOTAL_STATS.ngos}</div>
                      <div className="font-bold text-sm uppercase tracking-widest border-t-2 border-cannis-ink group-hover:border-cannis-cream pt-2 transition-colors font-sans">ONGs</div>
                    </div>
                  </div>
                </BrutalistCard>

                {/* Global Investment BarChart */}
                <BrutalistCard title="Ranking de Inversiones (Mapa de Calor)" className="mt-8 overflow-hidden">
                  <div className="h-64 sm:h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={investmentData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-cannis-olive-light)" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'var(--color-cannis-ink)', fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: 11 }}
                          width={100}
                        />
                        <RechartsTooltip 
                          cursor={{ fill: 'var(--color-cannis-olive-light)', opacity: 0.2 }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-cannis-ivory brutal-border p-2 brutal-shadow-sm font-mono text-xs z-50 relative pointer-events-none">
                                  <div className="font-bold">{payload[0].payload.name}</div>
                                  <div className="text-cannis-ink mt-1 opacity-80 font-bold">Inversión:</div>
                                  <div className="font-bold text-sm tracking-tight">{payload[0].payload.investmentStr}</div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar 
                          dataKey="investment" 
                          className="cursor-pointer transition-all duration-300" 
                          onClick={(data) => setSelectedProvId(data.id === selectedProvId ? null : data.id)}
                        >
                          {investmentData.map((entry, index) => {
                            const ratio = maxInvestment > 0 ? entry.investment / maxInvestment : 0.1;
                            let fill = 'var(--color-cannis-olive-light)';
                            if (entry.id === selectedProvId) fill = 'var(--color-cannis-ivory)';
                            else if (ratio >= 0.7) fill = 'var(--color-cannis-ink)';
                            else if (ratio >= 0.4) fill = '#3f4a29';
                            else if (ratio >= 0.15) fill = 'var(--color-cannis-olive)';
                            else fill = '#d8dbcb';
                            
                            const isSelected = entry.id === selectedProvId;
                            
                            return (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={fill} 
                                stroke="var(--color-cannis-ink)" 
                                strokeWidth={isSelected ? 3 : 2}
                              />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </BrutalistCard>

              </motion.div>
              {/* News Section */}
              <BrutalistCard title="Últimas Noticias (Google News)" className="mt-8 bg-cannis-ivory">
                {nationalLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="animate-spin text-cannis-ink" size={32} />
                  </div>
                ) : nationalNews && nationalNews.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {nationalNews.map((news) => (
                      <a 
                        key={news.id} 
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block brutal-border bg-cannis-cream p-4 hover:bg-cannis-ink hover:text-cannis-cream transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Newspaper size={14} className="group-hover:text-cannis-cream" />
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-cannis-olive text-cannis-ink px-2 py-0.5 border border-cannis-ink truncate max-w-[120px] font-sans">
                                {news.source}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-400 font-sans">
                                {news.date}
                              </span>
                            </div>
                            <h4 className="font-serif font-bold text-sm sm:text-base leading-tight line-clamp-3">
                              {news.title}
                            </h4>
                          </div>
                          <ExternalLink size={16} className="flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 brutal-border border-dashed text-center font-bold text-sm uppercase text-gray-500 font-sans">
                    No se encontraron noticias recientes
                  </div>
                )}
              </BrutalistCard>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
