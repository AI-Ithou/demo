import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html, Float, Stars, RoundedBox, Line } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowLeft, Sparkles, Play, Pause, RotateCcw, BookOpen, PenTool, MessageCircle } from 'lucide-react';
import learningTrajectoryData from '../data/learning_trajectory_data';

// --- 3D Components ---

const Block = ({ node, isHovered, setHoveredNode }) => {
    // Map 2D position to 3D world coordinates (scale down by 40)
    const x = (node.position.x - 1000) / 40;
    const z = (node.position.y - 250) / 40;

    const isCompleted = node.status === 'completed';
    const isCurrent = node.status === 'current';

    // Height based on status
    let height = 0.8;
    if (isCurrent) height = 1.5;
    if (isCompleted) height = 1.0;

    // Color based on score
    let color = '#64748b'; // slate
    if (node.score >= 90) color = '#10b981'; // emerald
    else if (node.score >= 80) color = '#3b82f6'; // blue
    else if (node.score >= 70) color = '#f59e0b'; // amber

    if (isCurrent) color = '#f43f5e'; // rose

    // Hover animation state
    const targetY = isHovered ? (height * 1.5) / 2 + 1.2 : (height * 1.5) / 2;

    // Refs for animation
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 10);

            // Gentle rotation for current node
            if (isCurrent) {
                meshRef.current.rotation.y += delta * 0.5;
            }
        }
    });

    return (
        <group position={[x, 0, z]}>
            {/* The Block Mesh - Card Style */}
            <RoundedBox
                ref={meshRef}
                args={[3.5, height * 1.5, 2]}
                radius={0.2}
                smoothness={4}
                position={[0, height / 2, 0]}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredNode(node.id);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredNode(null);
                }}
            >
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.3}
                    emissive={color}
                    emissiveIntensity={isCurrent ? 0.6 : 0.2}
                />
            </RoundedBox>

            {/* Platform/Base Shadow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[4.5, 4.5]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.3} />
            </mesh>

            {/* 3D Label - Title */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                <Text
                    position={[0, height * 1.5 + 1.2, 0]}
                    fontSize={0.45}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                    maxWidth={3.5}
                    fontWeight="bold"
                >
                    {node.title}
                </Text>
                <Text
                    position={[0, height * 1.5 + 0.6, 0]}
                    fontSize={0.28}
                    color="#94a3b8"
                    anchorX="center"
                    anchorY="middle"
                >
                    {node.subtitle}
                </Text>
            </Float>

            {/* Glow effect for current node */}
            {isCurrent && (
                <pointLight position={[0, height / 2, 0]} intensity={2} distance={5} color={color} />
            )}

            {/* Detailed Popover */}
            {isHovered && (
                <Html position={[0, height * 1.5 + 3, 0]} center distanceFactor={6} zIndexRange={[100, 0]}>
                    <div className="w-96 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-3 border-cyan-500/60 rounded-3xl p-7 shadow-2xl shadow-cyan-500/40 pointer-events-none select-none">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h3 className="font-bold text-white text-2xl">{node.title}</h3>
                                <p className="text-sm text-cyan-400 mt-2">{node.date}</p>
                            </div>
                            {node.score && (
                                <div className="bg-emerald-500/20 border-2 border-emerald-500/60 rounded-xl px-4 py-2">
                                    <div className="text-emerald-400 font-bold text-2xl">{node.score}</div>
                                    <div className="text-xs text-emerald-300 mt-1">分数</div>
                                </div>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50">
                                <BookOpen size={28} className="mx-auto mb-3 text-blue-400" />
                                <div className="text-3xl font-bold text-white">{node.stats?.resources || 0}</div>
                                <div className="text-sm text-slate-400 mt-2">资料</div>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50">
                                <PenTool size={28} className="mx-auto mb-3 text-amber-400" />
                                <div className="text-3xl font-bold text-white">{node.stats?.exercises || 0}</div>
                                <div className="text-sm text-slate-400 mt-2">刷题</div>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 text-center border border-slate-700/50">
                                <MessageCircle size={28} className="mx-auto mb-3 text-purple-400" />
                                <div className="text-3xl font-bold text-white">{node.stats?.questions || 0}</div>
                                <div className="text-sm text-slate-400 mt-2">提问</div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        {isCurrent && (
                            <div className="mt-5 text-center">
                                <div className="inline-block bg-rose-500/20 border-2 border-rose-500/60 rounded-full px-6 py-2">
                                    <span className="text-rose-400 text-sm font-bold">● 进行中</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Html>
            )}
        </group>
    );
};

const TrajectoryAvatar = ({ trajectoryNodes, isPlaying, setIsPlaying, playbackSpeed = 1 }) => {
    const meshRef = useRef();
    const [progress, setProgress] = useState(0); // 0 to 1 along the path

    // Define the trajectory path (only completed + current nodes)
    const trajectoryPath = useMemo(() => {
        const nodes = trajectoryNodes.filter(n => n.status === 'completed' || n.status === 'current');
        if (nodes.length < 2) return null;

        const points = nodes.map(n => {
            const x = (n.position.x - 1000) / 40;
            const z = (n.position.y - 250) / 40;
            return new THREE.Vector3(x, 2, z);
        });

        return new THREE.CatmullRomCurve3(points);
    }, [trajectoryNodes]);

    useFrame((state, delta) => {
        if (isPlaying && trajectoryPath && meshRef.current) {
            const newProgress = progress + (delta * 0.2 * playbackSpeed);

            if (newProgress >= 1) {
                setProgress(1);
                setIsPlaying(false); // Stop when done
            } else {
                setProgress(newProgress);
            }

            const point = trajectoryPath.getPointAt(newProgress);
            meshRef.current.position.copy(point);

            // Look ahead
            const tangent = trajectoryPath.getTangentAt(newProgress);
            const lookAtPos = point.clone().add(tangent);
            meshRef.current.lookAt(lookAtPos);
        }
    });

    // Reset handler
    useEffect(() => {
        if (progress >= 1 && isPlaying) {
            setProgress(0);
        }
    }, [isPlaying]);

    // Calculate trail points
    const trailPoints = useMemo(() => {
        if (!trajectoryPath) return [];
        return trajectoryPath.getPoints(100);
    }, [trajectoryPath]);

    // Determine visible trail based on progress
    const visiblePoints = useMemo(() => {
        if (!trailPoints.length) return [];
        const currentPointIndex = Math.floor(progress * 100);
        const points = trailPoints.slice(0, currentPointIndex + 1);
        if (meshRef.current) {
            points.push(meshRef.current.position);
        }
        return points;
    }, [progress, trailPoints]);

    if (!trajectoryPath) return null;

    return (
        <group>
            {/* Trail Line */}
            {visiblePoints.length > 1 && (
                <Line
                    points={visiblePoints}
                    color="#f43f5e"
                    lineWidth={4}
                    opacity={1}
                    transparent
                />
            )}

            {/* Avatar */}
            <group ref={meshRef} position={trajectoryPath.getPointAt(0)}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <coneGeometry args={[0.3, 0.8, 16]} />
                    <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.8} />
                </mesh>
                <pointLight intensity={0.5} distance={3} color="#f43f5e" />
            </group>
        </group>
    );
};

const TrajectoryLine = ({ trajectoryNodes }) => {
    const points = useMemo(() => {
        return trajectoryNodes.map(n => {
            const x = (n.position.x - 1000) / 40;
            const z = (n.position.y - 250) / 40;
            return [x, 0.1, z]; // Slightly raised to avoid z-fighting with base
        });
    }, [trajectoryNodes]);

    return (
        <Line
            points={points}
            color="#06b6d4" // cyan-500
            lineWidth={2}
            opacity={0.15}
            transparent
            dashed={true}
            dashScale={2}
            dashSize={1}
            gapSize={0.5}
        />
    );
};

// --- Main Page Component ---


const MyLearningTrajectoryPage = () => {
    const navigate = useNavigate();
    const { trajectoryNodes, summary } = learningTrajectoryData;
    const [hoveredNode, setHoveredNode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="h-screen w-screen bg-[#0f172a] relative overflow-hidden">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 shadow-lg"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-bold">返回</span>
                    </button>
                </div>
                <div className="pointer-events-auto bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md px-6 py-4 rounded-2xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles size={20} className="text-cyan-400" />
                        学习脚步回放
                    </h1>
                    <p className="text-xs text-cyan-300 mt-1">拖动探索 · 悬停查看详情</p>
                </div>
                <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-700 shadow-xl">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-cyan-400">{summary.completedTopics}</div>
                            <div className="text-xs text-slate-400">已完成</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-emerald-400">{summary.averageScore}</div>
                            <div className="text-xs text-slate-400">平均分</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 3D Canvas */}
            <Canvas shadows camera={{ position: [0, 25, 25], fov: 50 }}>
                <color attach="background" args={['#0f172a']} />
                <fog attach="fog" args={['#0f172a', 20, 80]} />
                <ambientLight intensity={0.4} />
                <pointLight position={[15, 15, 15]} intensity={1.5} castShadow />
                <pointLight position={[-15, 10, -15]} intensity={0.8} color="#3b82f6" />
                <Stars radius={150} depth={60} count={8000} factor={5} saturation={0} fade speed={1} />

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minDistance={10}
                    maxDistance={60}
                    autoRotate={!hoveredNode && !isPlaying}
                    autoRotateSpeed={0.3}
                />

                <group position={[0, 0, 0]}>
                    {trajectoryNodes.map(node => (
                        <Block
                            key={node.id}
                            node={node}
                            isHovered={hoveredNode === node.id}
                            setHoveredNode={setHoveredNode}
                        />
                    ))}

                    {/* Trajectory Line */}
                    <TrajectoryLine trajectoryNodes={trajectoryNodes} />

                    {/* Playback Avatar */}
                    <TrajectoryAvatar
                        trajectoryNodes={trajectoryNodes}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />

                    <gridHelper args={[80, 80, '#1e293b', '#0f172a']} position={[0, -0.01, 0]} />
                </group>
            </Canvas>

            {/* Playback Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-4 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md px-8 py-5 rounded-2xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-500/50 transition-all active:scale-95"
                >
                    {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
                </button>
                <div className="text-white">
                    <div className="text-base font-bold">轨迹回放</div>
                    <div className="text-xs text-cyan-300">{isPlaying ? '正在演示...' : '点击播放学习历程'}</div>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="absolute bottom-10 left-10 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Sparkles size={14} className="text-cyan-400" />
                    学习统计
                </h3>
                <div className="space-y-2 text-xs">
                    <div className="flex justify-between gap-6">
                        <span className="text-slate-400">学习天数</span>
                        <span className="text-white font-bold">{summary.totalDays} 天</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-slate-400">总资料</span>
                        <span className="text-blue-400 font-bold">{summary.totalResources}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-slate-400">总刷题</span>
                        <span className="text-amber-400 font-bold">{summary.totalExercises}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                        <span className="text-slate-400">总提问</span>
                        <span className="text-purple-400 font-bold">{summary.totalQuestions}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLearningTrajectoryPage;
