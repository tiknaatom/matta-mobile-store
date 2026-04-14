"use client";

// 1. UPDATED IMPORTS: Added useState, useEffect, and PapaParse
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, RoundedBox } from '@react-three/drei';
import Papa from 'papaparse';

// --- YOUR EXISTING 3D PHONE CODE REMAINS UNCHANGED ---
function IPhone17ProMax() {
  const phoneRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (phoneRef.current) { phoneRef.current.rotation.y += delta * 0.3; }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={phoneRef}>
        <RoundedBox args={[1.58, 3.25, 0.17]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#c25e29" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[1.52, 3.19, 0.18]} radius={0.18} smoothness={4} position={[0, 0, 0.01]}>
          <meshStandardMaterial color="#050505" metalness={1} roughness={0.05} />
        </RoundedBox>
        <RoundedBox args={[0.4, 0.1, 0.19]} radius={0.05} smoothness={4} position={[0, 1.4, 0.015]}>
          <meshStandardMaterial color="#000000" metalness={1} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[1.4, 0.65, 0.08]} radius={0.1} smoothness={4} position={[0, 1.0, -0.09]}>
          <meshStandardMaterial color="#a64b1d" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <mesh position={[-0.35, 1.15, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 32]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.35, 0.85, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 32]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.0, 1.0, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 32]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.35, 1.1, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} emissive="#444444" />
        </mesh>
        <mesh position={[0.35, 0.9, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center overflow-hidden">
      <div className="absolute z-10 text-center pointer-events-none">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-lg">
          Matta Mobile Store
        </h1>
        <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto drop-shadow-md">
          Discover the power of the A19 Pro. The ultimate iPhone 17 Pro Max is here.
        </p>
        <a href="#products" className="mt-8 inline-block px-10 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-orange-600 hover:bg-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all pointer-events-auto cursor-pointer">
          View All Models
        </a>
      </div>
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffedd5" />
          <pointLight position={[-10, -10, -10]} color="#ea580c" intensity={1.5} />
          <IPhone17ProMax />
          <Environment preset="studio" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#000000" />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}

// --- NEW CODE: THE PRODUCT GRID WITH GOOGLE SHEETS LIVE FETCH ---

function ProductGrid() {
  // State to store live data
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 // FETCH FROM GOOGLE SHEETS
  useEffect(() => {
    // 1. PASTE YOUR EXACT LINK HERE AGAIN:
    const baseSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQyb6k-RX4XT4q9HrolCv9cjdvF1GXIaiRiQvraI_LTJy0LfFoOcM_9dtEDPPd4DeIf9jY_ta4zvwhL/pub?output=csv";
    
    // 2. THE CACHE BUSTER: This forces the browser to fetch fresh data every time
    const sheetUrl = `${baseSheetUrl}&t=${new Date().getTime()}`;

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const validProducts = results.data.filter((item: any) => item.name);
        setProducts(validProducts);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      }
    });
  }, []);

  // WhatsApp Checkout Function
  const handleWhatsAppOrder = (productName: string, price: number) => {
    const phoneNumber = "919897281025"; 
    const message = `🚨 *NEW ORDER INQUIRY* 🚨\nStore: Matta Mobile Store\nItem: ${productName}\nPrice: ₹${price.toLocaleString('en-IN')}\n\nI would like to confirm availability and arrange a store pickup.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  // Show a loading screen while fetching from Google
  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl font-bold">Loading Live Inventory...</div>;
  }

  return (
    <div id="products" className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Latest Smartphones</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              
              {/* Product Image Area - FIXED CROPPING */}
              <div className="relative h-64 bg-gray-200">
               <img src={product.image ? product.image.trim().replace(/\\/g, '/') : ''} alt={product.name} className="w-full h-full object-contain p-4 bg-white" />
                
                {product.isDeal === 'TRUE' && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Limited Time Deal
                  </span>
                )}
                
                {/* Out of Stock Overlay */}
                {product.inStock === 'FALSE' && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                    <span className="text-red-600 font-extrabold text-2xl border-4 border-red-600 p-2 transform -rotate-12">OUT OF STOCK</span>
                  </div>
                )}
              </div>

              {/* Product Details Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                
                {/* Pricing Logic */}
                <div className="mt-auto">
                  {product.isDeal === 'TRUE' ? (
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{Number(product.dealPrice).toLocaleString('en-IN')}</span>
                      <span className="text-sm text-gray-500 line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
                  )}
                  
                  {product.inStock === 'TRUE' ? (
                     <p className="text-sm text-green-600 font-medium mt-1">In Stock</p>
                  ) : (
                     <p className="text-sm text-red-600 font-medium mt-1">Currently Unavailable</p>
                  )}
                </div>

                {/* WhatsApp Order Button */}
                <button 
                  disabled={product.inStock === 'FALSE'}
                  onClick={() => handleWhatsAppOrder(product.name, product.isDeal === 'TRUE' ? Number(product.dealPrice) : Number(product.originalPrice))}
                  className={`mt-6 w-full text-white font-bold py-3 px-4 rounded flex items-center justify-center space-x-2 transition-colors ${product.inStock === 'TRUE' ? 'bg-[#25D366] hover:bg-[#1ebd5b]' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN EXPORT WIRING IT TOGETHER ---
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductGrid />
    </main>
  );
}