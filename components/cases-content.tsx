export default function CasesContent() {
  const cases = [
    { id: '000085', date: '20/10/2024', daysOpen: 392, type: 'MSR-01', title: 'BLR DUTY PHONE SIM', flags: '', ercScore: '1', siraResult: '-', inOverdue: '', progress: '', closed: '', delegation: 'Investigate: (open)' },
    { id: '000084', date: '14/10/2024', daysOpen: 398, type: 'MSR-01', title: 'Lufthansa/ D-AIGO - Silver Dot Application not in accordance with DLH Procedure Manual', flags: '', ercScore: '4', siraResult: '-', inOverdue: '', progress: '', closed: '', delegation: 'Investigate: (open)' },
    { id: '000082, 000083 [M]', date: '11/10/2024', daysOpen: 401, type: 'MSR-01', title: 'slat touching C-duct', flags: 'Fatg.', ercScore: '20', siraResult: '-', inOverdue: '', progress: '', closed: '', delegation: 'Investigate: (open)' },
    { id: '000081', date: '10/10/2024', daysOpen: 402, type: 'MSR-01', title: 'SmartLynx, TOR-168/2024 ACFT generates report with wrong ENG type template, YL-LDX', flags: '', ercScore: '4', siraResult: '-', inOverdue: '', progress: '', closed: '', delegation: 'Investigate: (open)' },
    { id: '000062', date: '18/07/2024', daysOpen: 486, type: 'HAZ-02', title: 'PAINT VAPORS IN BAY 5', flags: '', ercScore: '20', siraResult: '-', inOverdue: '1', progress: '', closed: '', delegation: 'Case: PC Investigate: (open)' },
    { id: '000061', date: '17/07/2024', daysOpen: 487, type: 'HAZ-01', title: 'CHR AP EVENT NOTIFICATION IDLE RUN ON F-HUNO', flags: '', ercScore: '101', siraResult: '-', inOverdue: '', progress: '', closed: '', delegation: 'Investigate: (open)' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>Showing all open cases</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded font-medium text-white" style={{ backgroundColor: 'var(--primary-blue)' }}>+ New report</button>
          <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--border-light)', color: 'var(--primary-blue)' }}>Show filters</button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-light)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--light-bg)' }}>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Subsystem No</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Date</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Days Open</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Type</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Title</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Flags</th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-dark)' }}>ERC Score</th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-dark)' }}>SIRA Result</th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-dark)' }}>In Overdue</th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-dark)' }}>Progr.</th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-dark)' }}>Closed</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Delegation</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid var(--border-light)` }}>
                <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>{caseItem.id}</td>
                <td className="px-4 py-3" style={{ color: 'var(--primary-blue)', fontWeight: 500 }}>{caseItem.date}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>{caseItem.daysOpen}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>{caseItem.type}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>{caseItem.title}</td>
                <td className="px-4 py-3">{caseItem.flags && <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: '#f0a000', color: 'white' }}>{caseItem.flags}</span>}</td>
                <td className="px-4 py-3 text-center"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: caseItem.ercScore === '20' || caseItem.ercScore === '101' ? '#f0a000' : 'var(--accent-green)', color: 'white' }}>{caseItem.ercScore}</span></td>
                <td className="px-4 py-3 text-center" style={{ color: 'var(--text-light)' }}>{caseItem.siraResult}</td>
                <td className="px-4 py-3 text-center">{caseItem.inOverdue && <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--accent-red)', color: 'white' }}>{caseItem.inOverdue}</span>}</td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-right" style={{ color: 'var(--primary-blue)', cursor: 'pointer' }}>{caseItem.delegation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>View Closed Cases 56</button>
        <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--border-light)', color: 'var(--primary-blue)' }}>Download</button>
      </div>
    </div>
  )
}
