// ConfirmDialog.tsx
import React from 'react';
import ReactDOM from 'react-dom';

import '../css/orderDialog.css';

interface ConfirmDialogProps {
  tableData: Array<any>;
}

const ConfirmDialogTable: React.FC<ConfirmDialogProps> = ({tableData}) => {
  return (
    <div>
      <div>
        <div>
          <table className='data-table'>
            <thead>
              <tr>
                <th>業者</th>
                <th>商品コード</th>
                <th>商品名</th>
                <th>数量</th>
                <th>商品単価</th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .filter((row) => {
                  const 商品コード = row.商品コード;
                  return 商品コード !== '';
                })
                .map((row, index) => (
                  <tr key={index}>
                    <td className='dtvendor'>{row.業者.value}</td>
                    <td className='dtcode'>{row.商品コード}</td>
                    <td className='dtname'>{row.商品名}</td>
                    <td className='dtquantity'>{row.数量}</td>
                    <td className='dtprice'>{row.商品単価}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialogTable;
