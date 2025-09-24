export default function History({ records, onClearHistory }) {
  return (
    <div className="history-section">
      <div className="history-header">
        <h3>계산 기록</h3>
        
        {records.length > 0 && (
          <button 
            className="clear-history-btn"
            onClick={onClearHistory}
            title="기록 초기화"
          >
            기록 초기화
          </button>
        )}
      </div>
      
      {records.length === 0 ? (
        <p className="no-history">아직 계산 기록이 없습니다.</p>
      ) : (
        <ul className="history-list">
          {records.map((record, index) => (
            <li key={index} className="history-item">
              {record}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}