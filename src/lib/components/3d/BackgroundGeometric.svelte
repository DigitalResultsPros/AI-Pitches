<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { Float } from '@threlte/extras';
</script>

<div class="h-full w-full">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

		<!-- Atmospheric Lighting -->
		<T.AmbientLight intensity={0.2} />
		<T.PointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
		<T.PointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />

		<!-- Floating Crystals -->
		<Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-1, 1]}>
			<T.Mesh position={[0, 0, -5]} rotation={[1, 1, 0]}>
				<T.IcosahedronGeometry args={[2, 0]} />
				<T.MeshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} wireframe={true} />
			</T.Mesh>
		</Float>

		<Float speed={2} rotationIntensity={2} floatIntensity={3} floatingRange={[-2, 2]}>
			<T.Mesh position={[-4, 2, -8]} rotation={[0, 1, 1]}>
				<T.OctahedronGeometry args={[1.5, 0]} />
				<T.MeshStandardMaterial
					color="#22d3ee"
					wireframe={true}
					emissive="#22d3ee"
					emissiveIntensity={0.5}
				/>
			</T.Mesh>
		</Float>

		<Float speed={1} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-1.5, 1.5]}>
			<T.Mesh position={[4, -2, -6]} rotation={[1, 0, 1]}>
				<T.TetrahedronGeometry args={[1.5, 0]} />
				<T.MeshStandardMaterial
					color="#d946ef"
					wireframe={true}
					emissive="#d946ef"
					emissiveIntensity={0.5}
				/>
			</T.Mesh>
		</Float>

		<!-- Background Stars (Subtle) -->
		<Float speed={0.2} rotationIntensity={0.5}>
			<T.Points>
				<T.BufferGeometry>
					<T.BufferAttribute
						args={[
							new Float32Array(Array.from({ length: 600 }, () => (Math.random() - 0.5) * 40)),
							3
						]}
						attach="attributes-position"
					/>
				</T.BufferGeometry>
				<T.PointsMaterial size={0.05} color="#475569" />
			</T.Points>
		</Float>
	</Canvas>
</div>
