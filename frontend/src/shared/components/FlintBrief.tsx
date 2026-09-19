import { ArrowRight } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import './FlintBrief.css';

const FLINT_ITEMS = [
    {
        tone: 'critical',
        content: (
            <>
                <span className="mention-chip mention-task">@Payment API Integration</span>{' '}
                is 2 days overdue and marked Critical. I&apos;d prioritize
                this today.
            </>
        ),
    },
    {
        tone: 'high',
        content: (
            <>
                <span className="mention-chip mention-task">@User Authentication</span> is
                blocking <span className="mention-chip mention-user">@Sarah</span> from
                continuing on <span className="mention-chip mention-project">@Phoenix</span>
                . This is your highest-impact task.
            </>
        ),
    },
    {
        tone: 'medium',
        content: (
            <>
                <span className="mention-chip mention-user">@Mike</span> mentioned you in{' '}
                <span className="mention-chip mention-task">@API Documentation</span>. Check
                that thread before moving on.
            </>
        ),
    },
];

const FlintBrief = () => {
    return (
        <div>
            <div
                className="flint-card-border2"
            >
                <div className="flint-card-inner2">
                    <div className="flint-header-row">
                        <div className="flint-brand-row">
                            <span className="flint-mark">
                                <AnimatedLogo animateOnView />
                            </span>
                            <div>
                                Flint Briefing
                            </div>
                        </div>
                        <span className="flint-date-label">Wed &middot; Dec 11</span>
                    </div>

                    <p className="flint-greeting">
                        Good morning, <span className="flint-name">John</span>. Here&apos;s
                        what needs your attention.
                    </p>

                    <div className="flint-items-list">
                        {FLINT_ITEMS.map((item, i) => (
                            <div className="flint-item-row" key={i}>
                                <span className={`flint-item-dot ${item.tone}`} />
                                <div className="flint-item-text">{item.content}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flint-footer-row">
                        <span className="flint-live-indicator">
                            <span className="flint-live-dot" />
                            Live &middot; updated 4m ago
                        </span>
                        <a href="#" className="flint-view-link">
                            View full briefing
                            <ArrowRight size={12} />
                        </a>
                    </div>
                    <div className="inner-inner">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlintBrief;