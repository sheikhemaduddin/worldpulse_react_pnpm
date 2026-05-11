import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDark, setSearch } from "../../store/slices/uiSlice";
import { CATEGORIES, TICKER_ITEMS } from "../../data/articles";
import { Search, Moon, Sun, Bookmark, TrendingUp, Globe, Menu, X } from "lucide-react";

function BreakingTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{background:"#dc2626",color:"#fff",overflow:"hidden",height:36,display:"flex",alignItems:"center"}}>
      <span style={{background:"#991b1b",padding:"0 14px",height:"100%",display:"flex",alignItems:"center",fontSize:11,fontWeight:800,letterSpacing:1,whiteSpace:"nowrap",flexShrink:0}}>LIVE</span>
      <div style={{overflow:"hidden",flex:1}}>
        <div className="ticker-track" style={{whiteSpace:"nowrap",padding:"0 24px"}}>
          {doubled.map((t,i)=><span key={i} style={{marginRight:48,fontSize:13}}>⚡ {t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dark = useSelector(s => s.ui.darkMode);
  const bookmarks = useSelector(s => s.news.bookmarks);
  const [search, setSearchLocal] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => { document.body.classList.toggle("dark", dark); }, [dark]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { dispatch(setSearch(search)); navigate("/search"); }
  };

  return (
    <div style={{minHeight:"100vh",background:dark?"#0f172a":"#f0f4f8",color:dark?"#e2e8f0":"#1a202c",transition:"background .3s"}}>
      <BreakingTicker/>
      <header style={{background:dark?"#1e293b":"#fff",borderBottom:`1px solid ${dark?"#334155":"#e2e8f0"}`,padding:"0 24px",position:"sticky",top:0,zIndex:1000}}>
        <div style={{maxWidth:1280,margin:"0 auto",height:64,display:"flex",alignItems:"center",gap:16}}>
          <Link to="/" style={{fontFamily:"Merriweather,serif",fontSize:26,fontWeight:700,color:dark?"#e2e8f0":"#1a202c",flexShrink:0,letterSpacing:-1}}>World<span style={{color:"#dc2626"}}>Pulse</span></Link>
          <form onSubmit={handleSearch} style={{flex:1,maxWidth:360,position:"relative"}}>
            <Search size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}/>
            <input value={search} onChange={e=>setSearchLocal(e.target.value)} placeholder="Search news..." style={{width:"100%",padding:"8px 12px 8px 36px",borderRadius:8,border:`1px solid ${dark?"#334155":"#e2e8f0"}`,background:dark?"#0f172a":"#f8fafc",color:dark?"#e2e8f0":"#1a202c",fontSize:14,boxSizing:"border-box"}}/>
          </form>
          <nav style={{display:"flex",gap:4,alignItems:"center"}}>
            <NavLink to="/trending" style={({isActive})=>({padding:"6px 12px",borderRadius:6,fontSize:14,fontWeight:500,color:isActive?"#dc2626":dark?"#94a3b8":"#475569",background:isActive?dark?"#1e293b":"#fef2f2":"transparent",display:"flex",alignItems:"center",gap:5,textDecoration:"none"})}><TrendingUp size={15}/> Trending</NavLink>
            <button onClick={()=>dispatch(toggleDark())} style={{padding:8,borderRadius:8,border:"none",background:dark?"#334155":"#f1f5f9",color:dark?"#e2e8f0":"#475569",cursor:"pointer"}}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
            {bookmarks.length > 0 && <Link to="/" style={{padding:8,borderRadius:8,background:dark?"#334155":"#f1f5f9",color:dark?"#e2e8f0":"#475569",position:"relative",display:"flex"}}><Bookmark size={18}/><span style={{position:"absolute",top:-4,right:-4,background:"#dc2626",color:"#fff",fontSize:10,fontWeight:700,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{bookmarks.length}</span></Link>}
          </nav>
        </div>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",gap:2,paddingBottom:8,overflowX:"auto"}}>
          {CATEGORIES.map(c=>(
            <NavLink key={c.slug} to={c.slug==="all"?"/":"/category/"+c.slug} end={c.slug==="all"}
              style={({isActive})=>({padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:isActive?600:400,color:isActive?c.color:dark?"#64748b":"#64748b",background:isActive?c.color+"15":"transparent",textDecoration:"none",whiteSpace:"nowrap",borderBottom:isActive?`2px solid ${c.color}`:"2px solid transparent"})}>
              {c.label}
            </NavLink>
          ))}
        </div>
      </header>
      <main style={{maxWidth:1280,margin:"0 auto",padding:"24px 24px"}}><Outlet/></main>
      <footer style={{background:dark?"#1e293b":"#1a202c",color:"#94a3b8",padding:"32px 24px",marginTop:48,textAlign:"center",fontSize:13}}>
        <p style={{margin:"0 0 8px",fontFamily:"Merriweather,serif",fontSize:20,fontWeight:700,color:"#fff"}}>World<span style={{color:"#dc2626"}}>Pulse</span></p>
        <p style={{margin:0}}>© {new Date().getFullYear()} WorldPulse Media. All rights reserved.</p>
      </footer>
    </div>
  );
}