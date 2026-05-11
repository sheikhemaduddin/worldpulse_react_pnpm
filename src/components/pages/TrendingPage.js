import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ARTICLES } from "../../data/articles";
import { TrendingUp, Flame, Eye } from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TrendingPage() {
  const dark = useSelector(s=>s.ui.darkMode);
  const [liveViews, setLiveViews] = useState(ARTICLES.map(a=>a.views));
  const sorted = [...ARTICLES].sort((a,b)=>b.views-a.views);

  useEffect(()=>{
    const t = setInterval(()=>setLiveViews(v=>v.map(n=>n+Math.floor(Math.random()*80))), 2000);
    return ()=>clearInterval(t);
  },[]);

  const catViews = {};
  ARTICLES.forEach(a=>{ catViews[a.category] = (catViews[a.category]||0)+a.views; });
  const doughnutData = { labels: Object.keys(catViews), datasets:[{ data:Object.values(catViews), backgroundColor:["#0ea5e9","#8b5cf6","#f59e0b","#10b981","#ef4444","#ec4899"], borderWidth:0 }] };

  const barData = { labels: sorted.slice(0,8).map(a=>a.title.substring(0,18)+"..."), datasets:[{ data:liveViews.slice(0,8).map(v=>Math.round(v/1000)), backgroundColor:"#dc2626", borderRadius:6, label:"Views (k)" }] };
  const barOpts = { responsive:true, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false},ticks:{font:{size:10},color:"#94a3b8"}},y:{grid:{color:dark?"#1e293b":"#f1f5f9"},ticks:{color:"#94a3b8",callback:v=>v+"k"}}} };

  return (
    <div>
      <h1 style={{margin:"0 0 4px",fontSize:26,fontWeight:800,display:"flex",alignItems:"center",gap:10}}><Flame color="#dc2626" size={26}/>Trending Now</h1>
      <p style={{margin:"0 0 28px",color:"#64748b",fontSize:14}}>Live readership data updates every 2 seconds</p>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24,marginBottom:32}}>
        <div style={{background:dark?"#1e293b":"#fff",borderRadius:16,padding:20,border:`1px solid ${dark?"#334155":"#e2e8f0"}`}}>
          <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,display:"flex",alignItems:"center",gap:8}}><Eye size={16} color="#dc2626"/>Live Views (thousands)</h3>
          <Bar data={barData} options={barOpts}/>
        </div>
        <div style={{background:dark?"#1e293b":"#fff",borderRadius:16,padding:20,border:`1px solid ${dark?"#334155":"#e2e8f0"}`}}>
          <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700}}>Readership by Category</h3>
          <Doughnut data={doughnutData} options={{plugins:{legend:{position:"bottom",labels:{font:{size:11},padding:10}}}}}/>
        </div>
      </div>

      <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700}}>Most Read Articles</h2>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {sorted.map((a,i)=>(
          <Link key={a.id} to={`/article/${a.id}`} style={{display:"flex",gap:14,alignItems:"center",background:dark?"#1e293b":"#fff",borderRadius:12,padding:"14px 18px",border:`1px solid ${dark?"#334155":"#e2e8f0"}`,textDecoration:"none",color:"inherit",transition:"background .15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=dark?"#273549":"#f8fafc"} onMouseLeave={e=>e.currentTarget.style.background=dark?"#1e293b":"#fff"}>
            <span style={{fontSize:20,fontWeight:800,color:"#f1f5f9",minWidth:32}}>{i+1}</span>
            <img src={a.image} alt={a.title} style={{width:60,height:48,objectFit:"cover",borderRadius:8,flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 4px",fontWeight:600,fontSize:14,lineHeight:1.3,color:dark?"#e2e8f0":"#1a202c"}}>{a.title}</p>
              <span style={{fontSize:12,color:"#94a3b8"}}>{a.author}</span>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <p style={{margin:"0 0 2px",fontWeight:700,fontSize:15,color:"#dc2626"}}>{(liveViews[ARTICLES.findIndex(x=>x.id===a.id)]/1000).toFixed(1)}k</p>
              <p style={{margin:0,fontSize:11,color:"#94a3b8"}}>live views</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}