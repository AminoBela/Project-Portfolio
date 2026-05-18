function ProjectCardSkeleton() {
    return (
        <div className="project-card skeleton-card" aria-hidden="true">
            <div className="project-card__header">
                <div className="skeleton-shape skeleton-shape--icon" />
                <div className="project-card__header-text" style={{ flex: 1 }}>
                    <div className="skeleton-shape skeleton-shape--title" />
                    <div className="skeleton-shape skeleton-shape--subtitle" />
                </div>
            </div>
            <div className="skeleton-shape skeleton-shape--line" />
            <div className="skeleton-shape skeleton-shape--line skeleton-shape--line-short" />
            <div className="skeleton-shape skeleton-shape--line skeleton-shape--line-short" />
            <div className="project-tags">
                <div className="skeleton-shape skeleton-shape--tag" />
                <div className="skeleton-shape skeleton-shape--tag" />
                <div className="skeleton-shape skeleton-shape--tag" />
            </div>
            <div className="project-card__footer">
                <div className="skeleton-shape skeleton-shape--stats" />
                <div className="skeleton-shape skeleton-shape--button" />
            </div>
        </div>
    );
}

export default ProjectCardSkeleton;
