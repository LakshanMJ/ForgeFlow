'use client';

import { useRef } from 'react';
import {
    Camera,
    Trash2,
    Upload,
    UserCircle,
} from 'lucide-react';

interface PhotoUploadProps {
    value?: string | null;
    onChange: (file: File | null) => void;
    disabled?: boolean;
}

export default function PhotoUpload({
    value,
    onChange,
    disabled = false,
}: PhotoUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/gif',
        ];

        if (!allowedTypes.includes(file.type)) {
            alert('Please select a PNG, JPG, JPEG, WEBP, or GIF image.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB.');
            return;
        }

        onChange(file);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        onChange(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <div className="form-section-header">
                <Camera size={15} />
                <span className="form-section-title">
                    Profile Picture
                </span>
            </div>

            <div className="profile-picture-row">
                <div className="avatar-upload-col">
                    <div className="avatar-upload-box">
                        {value ? (
                            <img
                                src={value}
                                alt="Avatar preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        ) : (
                            <>
                                <span className="avatar-upload-icon-circle">
                                    <UserCircle size={30} />
                                </span>

                                <span className="avatar-upload-label">
                                    Avatar
                                    <br />
                                    Preview
                                </span>
                            </>
                        )}
                    </div>

                    <button
                        className="btn-secondary btn-block"
                        type="button"
                        onClick={handleUploadClick}
                        disabled={disabled}
                    >
                        <Upload size={14} />
                        Upload Photo
                    </button>

                    <button
                        className="btn-outline-danger"
                        type="button"
                        onClick={handleRemove}
                        disabled={!value || disabled}
                    >
                        <Trash2 size={14} />
                        Remove Photo
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp,.gif"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="upload-info-col">
                    <div className="upload-info-row">
                        <span className="upload-info-label">
                            Supported formats:
                        </span>
                        <span className="upload-info-value">
                            PNG, JPG, JPEG, WEBP, GIF
                        </span>
                    </div>

                    <div className="upload-info-row">
                        <span className="upload-info-label">
                            Max size:
                        </span>
                        <span className="upload-info-value">
                            5MB
                        </span>
                    </div>

                    <div className="upload-info-row">
                        <span className="upload-info-label">
                            Recommended:
                        </span>
                        <span className="upload-info-value">
                            400x400px
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}