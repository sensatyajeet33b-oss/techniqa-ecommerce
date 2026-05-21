import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, Card, Tooltip } from "@mui/material";
import BPRefcool from "../assets/bp-refcool.png";
import Errecom from "../assets/errecom.png";
import Accutools from "../assets/accutools.png";
import Ecoab from "../assets/ecoab.png";
import Appion from "../assets/appion.png";
import YellowJacket from "../assets/yellow-jacket.png";
import Crane from "../assets/crane.png";
import Inficon from "../assets/inficon.png";
import Coendurol from "../assets/coendurol.png";
import Climacheck from "../assets/climacheck.png";

const row1 = [
    { logo: BPRefcool,  name: "BP Refcool",    desc: "Premium Refrigeration Oils" },
    { logo: Errecom,    name: "Errecom",        desc: "HVAC Treatment Solutions" },
    { logo: Accutools,  name: "Accutools",      desc: "Precision Service Tools" },
    { logo: Ecoab,      name: "Ecoab",          desc: "Eco Refrigerant Systems" },
    { logo: Appion,     name: "Appion",         desc: "Industrial HVAC Solutions" },
];

const row2 = [
    { logo: YellowJacket, name: "Yellow Jacket", desc: "Professional HVAC Gauges" },
    { logo: Crane,        name: "Crane",         desc: "Industrial Fluid Control" },
    { logo: Inficon,      name: "Inficon",        desc: "Leak Detection Systems" },
    { logo: Coendurol,    name: "Coendurol",     desc: "Compressor Lubricants" },
    { logo: Climacheck,   name: "Climacheck",    desc: "Performance Analytics" },
];

const stats = [
    { value: "50+",  label: "Global Partners" },
    { value: "10K+", label: "HVAC Professionals" },
    { value: "15+",  label: "Years of Industry Expertise" },
];

const BrandCard = ({ logo, name, desc }) => (
    <Tooltip
        title={
            <Box sx={{ textAlign: "center", py: 0.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>
                    {name}
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)" }}>
                    {desc}
                </Typography>
            </Box>
        }
        arrow
        placement="top"
    >
        <Card
            elevation={0}
            sx={{
                height:   { xs: 88,  sm: 100, md: 110 },
                minWidth: { xs: 150, sm: 170, md: 190 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "linear-gradient(160deg, #ffffff 0%, #f1f5f9 100%)",
                border: "1px solid rgba(226,232,240,0.9)",
                borderRadius: { xs: "14px", md: "20px" },
                boxShadow: "0 8px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                cursor: "default",
                "&:hover": {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(6,182,212,0.07) 100%)",
                    boxShadow: "0 20px 40px rgba(6,182,212,0.15), 0 4px 12px rgba(15,23,42,0.08)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    transform: "translateY(-4px)",
                    "& img": {
                        filter: "grayscale(0%) opacity(1)",
                        transform: "scale(1.1)",
                    },
                },
            }}
        >
            <Box
                component="img"
                src={logo}
                alt={name}
                sx={{
                    maxWidth:  { xs: 100, sm: 115, md: 130 },
                    maxHeight: { xs: 46,  sm: 54,  md: 60  },
                    objectFit: "contain",
                    filter: "grayscale(100%) opacity(0.65)",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
            />
        </Card>
    </Tooltip>
);

const MarqueeRow = ({ items, direction = "left", duration = 38 }) => {
    const rowRef = useRef(null);

    return (
        <Box
            ref={rowRef}
            sx={{
                display: "flex",
                gap: { xs: "10px", sm: "14px", md: "16px" },
                width: "max-content",
                animation: `${direction === "left" ? "marqueeLeft" : "marqueeRight"} ${duration}s linear infinite`,
                "&:hover": {
                    animationPlayState: "paused",
                },
            }}
        >
            {[...items, ...items].map((item, index) => (
                <BrandCard key={index} {...item} />
            ))}
        </Box>
    );
};

const StatItem = ({ value, label, delay }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Box
            ref={ref}
            sx={{
                textAlign: "center",
                px: { xs: 2, sm: 3, md: 4 },
                borderRight: "1px solid rgba(6,182,212,0.2)",
                "&:last-child": { borderRight: "none" },
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
                minWidth: 0, // prevents flex children from overflowing
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: "1.5rem", sm: "1.9rem", md: "2.4rem" },
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                    mb: 0.5,
                }}
            >
                {value}
            </Typography>
            <Typography
                sx={{
                    fontSize: { xs: "0.65rem", sm: "0.72rem", md: "0.78rem" },
                    color: "#64748b",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    lineHeight: 1.4,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

const Brands = () => {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.2 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Box
            sx={{
                py: { xs: 6, sm: 8, md: 10 },
                overflow: "hidden",
                position: "relative",
                background: `
                    radial-gradient(ellipse at top right, rgba(6,182,212,0.07) 0%, transparent 50%),
                    radial-gradient(ellipse at bottom left, rgba(14,165,233,0.05) 0%, transparent 45%),
                    linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)
                `,
            }}
        >
            {/* Tech grid background */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                    pointerEvents: "none",
                }}
            />

            {/* Ambient glow orbs */}
            <Box sx={{ position: "absolute", top: "-80px", right: "-60px", width: { xs: 220, md: 400 }, height: { xs: 220, md: 400 }, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", bottom: "-60px", left: "10%", width: { xs: 180, md: 300 }, height: { xs: 180, md: 300 }, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.09), transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

            {/* Edge fade masks — narrower on mobile so they don't swallow cards */}
            <Box sx={{ position: "absolute", top: 0, left: 0, width: { xs: "48px", sm: "80px", md: "120px" }, height: "100%", background: "linear-gradient(to right, #f8fafc, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", top: 0, right: 0, width: { xs: "48px", sm: "80px", md: "120px" }, height: "100%", background: "linear-gradient(to left, #f1f5f9, transparent)", zIndex: 2, pointerEvents: "none" }} />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

                {/* Header */}
                <Box
                    ref={headerRef}
                    sx={{
                        mb: { xs: 4, sm: 5, md: 6 },
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(28px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    {/* Eyebrow */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <Box sx={{ width: 28, height: 2, background: "linear-gradient(to right, #0891b2, #06b6d4)", borderRadius: 2 }} />
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0891b2" }}>
                            Our Partners
                        </Typography>
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1.15,
                            mb: 1.2,
                            fontSize: { xs: "1.45rem", sm: "1.7rem", md: "2.2rem" },
                        }}
                    >
                        Trusted by Leading HVAC Brands
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            color: "#64748b",
                            maxWidth: { xs: "100%", sm: 460, md: 520 },
                            lineHeight: 1.7,
                        }}
                    >
                        We collaborate with globally recognized manufacturers to deliver
                        industrial-grade cooling and refrigeration solutions.
                    </Typography>
                </Box>

                {/* Trust Stats */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "space-between", sm: "space-around", md: "flex-start" },
                        alignItems: "center",
                        mb: { xs: 5, md: 7 },
                        gap: { xs: 0, md: 2 },
                        pl: { md: 1 },
                    }}
                >
                    {stats.map((stat, i) => (
                        <StatItem key={i} {...stat} delay={0.1 + i * 0.12} />
                    ))}
                </Box>
            </Container>

            {/* Row 1 — scrolls left */}
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <MarqueeRow items={row1} direction="left" duration={38} />
            </Box>

            {/* Row 2 — scrolls right */}
            <Box>
                <MarqueeRow items={row2} direction="right" duration={44} />
            </Box>

            {/* Keyframes */}
            <style>{`
                @keyframes marqueeLeft {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </Box>
    );
};

export default Brands;