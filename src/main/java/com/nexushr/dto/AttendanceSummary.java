package com.nexushr.dto;

public class AttendanceSummary {

    private long totalAttendance;
    private long presentCount;
    private long absentCount;
    private long leaveCount;

    public AttendanceSummary() {
    }

    public long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public long getPresentCount() {
        return presentCount;
    }

    public void setPresentCount(long presentCount) {
        this.presentCount = presentCount;
    }

    public long getAbsentCount() {
        return absentCount;
    }

    public void setAbsentCount(long absentCount) {
        this.absentCount = absentCount;
    }

    public long getLeaveCount() {
        return leaveCount;
    }

    public void setLeaveCount(long leaveCount) {
        this.leaveCount = leaveCount;
    }
}