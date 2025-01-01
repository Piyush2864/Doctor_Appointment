import AppointmentInfo from '../Models/appointmentModel.js';
import DoctorInfo from '../Models/doctorModel.js';
import PatientInfo from '../Models/patientModel.js';


export const bookAppointmentController = async(req, res)=> {
    const { doctorId, patientId, date, time, reason } = req.body;

    try {
        const doctor = await DoctorInfo.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found.'
            });
        }

        const patient = await PatientInfo.findById(patientId);
        if(!patient){
            return res.status(404).json({
                success: false,
                message: 'Patient not found.'
            });
        }

        const appointment = new AppointmentInfo({
            doctor: doctorId,
            patient: patientId,
            date,
            time,
            reason,
            status: 'Pending'
        });

        await appointment.save();

        return res.status(201).json({
            success: true,
            message: 'Appointment booked successfully.',
            data: appointment
        });
    } catch (error) {
        console.error('Error booking appointment.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAppointmentByDoctorController = async(req, res)=>{
    const { doctorId } = req.params;

    try {
        const appointments = await AppointmentInfo.find({doctor: doctorId}).populate('patient', 'name email contactNumber');
        if(!appointments) {
            return res.status(404).json({
                success: false,
                message: 'Appointments not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointments fetched successfully.',
            data: appointments
        });
    } catch (error) {
        console.error('Error fetching appointment.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAppointmentByPatientController = async(req, res)=> {
    const { patientId } = req.params;

    try {
        const appointments = await AppointmentInfo.find({patient: patientId}).populate('doctor', 'name specialization contactNumber');
        if(!appointments){
            return res.status(404).json({
                success: false,
                message: 'Appointments not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointments fetched successfully.',
            data: appointments
        });
    } catch (error) {
        console.error('Error fetching appointment.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const updateAppointmentsStatusController = async(req, res)=> {
    const { appointmentId } = req.params;
    const { status } = req.body;

    try {
        const appointment = await AppointmentInfo.findByIdAndUpdate(appointmentId, {status}, {new: true});
        if(!appointment){
            return res.status(404).json({
                success: false,
                message: 'Appointment not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointment status updated successfully.',
            data: appointment
        });
    } catch (error) {
        console.error('Error updating status appointment.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const cancelAppointmentController = async(req, res)=> {
    const { appointmentId } = req.params;

    try {
        const appointment = await AppointmentInfo.findByIdAndDelete(appointmentId);
        if(!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully.'
        });
    } catch (error) {
        console.error('Error canceling appointment.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


export const getAppointmentByIdController = async(req, res)=> {
    const { appointmentId } = req.params;

    try {
        const appointment = await AppointmentInfo.findById(appointmentId).populate('doctor', 'name specialization').populate('patient', 'name email contactNumber');
        if(!appointment){
            return res.status(404).json({
                success: false,
                message: 'Appointment not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointment fetched successfully.',
            data: appointment
        });
    } catch (error) {
        console.error('Error fetching appointment.:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};