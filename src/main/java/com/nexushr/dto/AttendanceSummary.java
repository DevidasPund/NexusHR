package com.nexushr.dto;

public class AttendanceSummary {

    private long totalEmployees;
    private long presentToday;
    private long absentToday;
    private double attendancePercentage;

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(
            long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getPresentToday() {
        return presentToday;
    }

    public void setPresentToday(
            long presentToday) {
        this.presentToday = presentToday;
    }

    public long getAbsentToday() {
        return absentToday;
    }

    public void setAbsentToday(
            long absentToday) {
        this.absentToday = absentToday;
    }

    public double getAttendancePercentage() {
        return attendancePercentage;
    }

    public void setAttendancePercentage(
            double attendancePercentage) {
        this.attendancePercentage =
                attendancePercentage;
    }
}