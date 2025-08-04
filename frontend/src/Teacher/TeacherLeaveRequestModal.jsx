// 📁 components/LeaveRequestModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Badge } from '@mui/material';

const TeacherLeaveRequestModal = ({ open, onClose, teacherId, onApprovalChange }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/leave-requests/teacher/${teacherId}`);
      setRequests(res.data.filter(r => r.status === 'Pending'));
    } catch (err) {
      console.error('Error fetching leave requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchRequests();
  }, [open]);

  const handleDecision = async (id, status, studentId, dateRange) => {
    try {
      await axios.put(`http://localhost:5000/api/leave-requests/${id}/status`, { status });
      if (status === 'Approved') {
        await axios.post('http://localhost:5000/api/attendance/mark-leave', {
          studentId,
          fromDate: dateRange.fromDate,
          toDate: dateRange.toDate,
        });
      }
      fetchRequests();
      onApprovalChange();
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Pending Leave Requests</DialogTitle>
      <DialogContent>
        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Student</th>
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="p-2 border">{req.studentId.name}</td>
                  <td className="p-2 border">{req.fromDate?.slice(0, 10)}</td>
                  <td className="p-2 border">{req.toDate?.slice(0, 10)}</td>
                  <td className="p-2 border">{req.typeOfLeave}</td>
                  <td className="p-2 border">{req.reason}</td>
                  <td className="p-2 border space-x-2">
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() =>
                        handleDecision(req._id, 'Approved', req.studentId, {
                          fromDate: req.fromDate,
                          toDate: req.toDate,
                        })
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDecision(req._id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherLeaveRequestModal;
