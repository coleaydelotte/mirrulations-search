import { useState } from 'react'
import './styles/mock.css'
import { searchDockets } from './api/searchApi'

export default function App() {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [results, setResults] = useState([])
    const [agency, setAgency] = useState('')

    const runSearch = async () => {
        const data = await searchDockets(query, filter, agency)
        setResults(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        runSearch()
    }

    return (
        <div className="app">
            <aside className="fade-right fade-delay-5">
                <div className="aside-title">
                    <h2>Advanced Search</h2>
                    <span className="pill" id="activeCount">0 active</span>
                </div>

                <div className="section">
                    <h3>Date Range</h3>

                    <div className="chip-row" id="dateChips">
                        <div className="chip" data-from="2021" data-to="2023">2021–2023</div>
                        <div className="chip" data-from="2026" data-to="2026">2026</div>
                        <div className="chip" data-from="" data-to="">All time</div>
                    </div>

                    <div style={{ height: '10px' }}></div>

                    <div className="row">
                        <div className="field">
                            <div className="label">From (year)</div>
                            <input type="number" id="yearFrom" placeholder="e.g. 2021" min="1900" max="2100" />
                        </div>
                        <div className="field">
                            <div className="label">To (year)</div>
                            <input type="number" id="yearTo" placeholder="e.g. 2023" min="1900" max="2100" />
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h3>Agency</h3>
                    <div className="agency-search">
                        <input type="text" id="agencySearch" placeholder="Search agencies…" />
                        <div className="agency-meta">
                            <span id="agencyMetaText">Showing top agencies</span>
                            <span className="pill" id="agencyShownCount">0</span>
                        </div>
                    </div>

                    <div className="agency-list" id="agencyList"></div>
                </div>

                <div className="section">
                    <h3>CFR Number</h3>
                    <div className="field" style={{ minWidth: '100%' }}>
                        <div className="label">Search by CFR</div>
                        <input type="text" id="cfrInput" placeholder="e.g. 40 CFR 122.26" />
                    </div>
                </div>

                <div className="section">
                    <h3>Document Type</h3>
                    <label className="check"><input type="checkbox" className="flt" data-key="type" value="Proposed" /> Proposed</label>
                    <label className="check"><input type="checkbox" className="flt" data-key="type" value="Final" /> Final</label>
                    <label className="check"><input type="checkbox" className="flt" data-key="type" value="Notice" /> Notice</label>
                </div>

                <div className="section">
                    <h3>Status</h3>
                    <label className="check"><input type="checkbox" className="flt" data-key="status" value="Open" /> Open</label>
                    <label className="check"><input type="checkbox" className="flt" data-key="status" value="Closed" /> Closed</label>
                    <label className="check"><input type="checkbox" className="flt" data-key="status" value="Pending" /> Pending</label>
                </div>

                <div className="mini-actions">
                    <button className="btn ghost" id="clearAll">Clear</button>
                    <button className="btn primary" id="applyAll">Apply</button>
                </div>
            </aside>

            <main>
                <div className="hero">
                    <h1 className="fade-down mirrulations-title">Mirrulation Explorer</h1>
                </div>

                <form className="fade-down fade-delay-3 search-card" onSubmit={handleSubmit}>
                    <div className="search-row">
                        <input
                            id="q"
                            placeholder="Enter search term"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button className="search-go" type="submit" aria-label="Search">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className="bar">
                        <div className="bar-left">
                            <select id="timeSelect" aria-label="Time filter">
                                <option value="all">All Time</option>
                                <option value="year">Past Year</option>
                                <option value="month">Past Month</option>
                                <option value="week">Past Week</option>
                            </select>

                            <button type="button" className="btn outline" id="downloadBtn">Download docket</button>
                        </div>

                        <div className="pill" id="summaryPill">Ready.</div>
                    </div>
                </form>

                <div className="download-wrap">
                    <div className="results">
                        {results.map((item, index) => (
                            <div className="result-card fade-down fade-delay-3" key={item.docket_id || index}>
                                <div className="card-header">
                                    <h3>{item.title}</h3>
                                    <span className="pill success">{item.document_type}</span>
                                </div>

                                <div className="card-meta">
                                    <span><strong>Agency:</strong> {item.agency_id}</span>
                                    <span><strong>CFR:</strong> {item.cfrPart}</span>
                                    <span><strong>Docket:</strong> {item.docket_id}</span>
                                </div>

                                <div className="card-actions">
                                    <button className="btn outline">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
