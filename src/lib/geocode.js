export async function geocode(query) {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', String(query || '').trim());
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('limit', '1');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('accept-language', 'ko');

    const res = await fetch(url.toString(), {headers: {Accept: 'application/json'}});
    if (!res.ok) throw new Error(`검색 실패: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('결과가 없어요. 더 구체적으로 입력해보세요.');

    const item = data[0];
    return {
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        displayName: String(item.display_name ?? ''),
    };
}
