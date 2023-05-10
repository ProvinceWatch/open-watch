"use client"
import Map from '@/components/Map';
import Layout from '@/components/Layout';

export default function MapPage() {
    return (
        <Layout>
            <Map lat={53.52904} lng={-113.48899} zoom={10} />
        </Layout>
    )
}